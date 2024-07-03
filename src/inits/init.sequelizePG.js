const { Sequelize } = require('sequelize');

const {
  pgConfigs: {
    pg: { user, password, host, port, database },
  },
} = require('@/configs');
const {
  timeConstants: { _5_SECOND, _10_SECOND },
} = require('@/constants');

class SequelizePGConnection {
  constructor() {
    this.sequelize = new Sequelize(database, user, password, {
      host,
      port,
      dialect: 'postgres',
      logging: false,
      pool: {
        max: 10,
        min: 0,
        acquire: _10_SECOND,
        idle: _5_SECOND,
      },
      logging: false,
      benchmark: true, // show query log
      isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.REPEATABLE_READ,
    });
    this.connectTimeout = undefined;
    this.isConnected = false;
  }

  async initDatabase(retries = 10) {
    while (retries > 0 && !this.isConnected) {
      try {
        await this.sequelize.authenticate();
        console.log('CONNECTED TO POSTGRESQL SUCCESS 🐘 !!');
        this.isConnected = true;
        clearTimeout(this.connectTimeout);
      } catch (error) {
        console.error('Failed to connect to PostgreSQL database:', error);
        retries -= 1;
        console.info(`Retrying to connect... (${10 - retries}/10)`);
        await new Promise(resolve => setTimeout(resolve, _5_SECOND));
      }
    }

    if (!this.isConnected) {
      this.handleTimeoutError();
    }
  }

  handleTimeoutError() {
    this.connectTimeout = setTimeout(() => {
      console.error('Failed to connect to PostgreSQL database after retries');
      throw new Error('Failed to connect to PostgreSQL database after retries');
    }, _10_SECOND);
  }

  closeDatabase() {
    if (this.isConnected) {
      clearTimeout(this.connectTimeout);
      this.sequelize.close().then(() => console.info('Disconnected from PostgreSQL database.'));
    }
  }
}

module.exports = new SequelizePGConnection();
