const mongoose = require('mongoose');

const {
  mongoConfigs: {
    mongo: { user, password, host, port, source, database, link },
  },
} = require('@/configs');
const {
  timeConstants: { _45_SECOND, _5_SECOND, _10_SECOND },
  appConstants: { NODE_ENVS },
} = require('@/constants');
const {
  appHelpers: { isNodeEnvMatch },
  stringHelpers: { replaceTemplateStrings },
} = require('@/helpers');

class MongoDBConnection {
  constructor() {
    this.URL_MONGO = replaceTemplateStrings(link, {
      username: user,
      password: encodeURIComponent(password),
      host,
      port,
      source,
      database,
    });

    this.client = {};
    this.connectTimeout = undefined;
    this.isConnected = false;

    mongoose.connection.once('connected', () => this.handleEventConnect(mongoose.connection));
    mongoose.connection.on('error', err => this.handleConnectionError(err));
  }

  handleTimeoutError() {
    this.connectTimeout = setTimeout(() => {
      console.error('Failed to connect to MongoDB database');
      throw new Error('Failed to connect to MongoDB database');
    }, _10_SECOND);
  }

  handleEventConnect(connection) {
    if (!this.isConnected && connection.readyState === 1) {
      console.info('CONNECTED TO MONGODB SUCCESS 🍃 !!');
      this.isConnected = true;
      clearTimeout(this.connectTimeout);
    }
  }

  async initDatabase(retries = 10) {
    if (isNodeEnvMatch(NODE_ENVS[0])) {
      mongoose.set('debug', true);
      mongoose.set('debug', { color: true });
    }

    try {
      await mongoose.connect(this.URL_MONGO, {
        serverSelectionTimeoutMS: _5_SECOND,
        socketTimeoutMS: _45_SECOND,
      });
      this.client.instanceConnect = mongoose.connection;
    } catch (err) {
      console.error('Failed to connect to MongoDB database', err);
      if (retries > 0) {
        console.info(`Retrying to connect... (${10 - retries + 1}/10)`);
        setTimeout(() => this.initDatabase(retries - 1), _5_SECOND);
      } else {
        this.handleTimeoutError();
      }
    }
  }

  getDatabase() {
    return this.client.instanceConnect;
  }

  closeDatabase() {
    if (this.client.instanceConnect) {
      clearTimeout(this.connectTimeout);
      this.client.instanceConnect.close(false, () => {
        console.info('Disconnected from MongoDB database.');
      });
    }
  }
}

module.exports = new MongoDBConnection();
