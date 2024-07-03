const IOREDIS = require('ioredis');

const {
  redisConfigs: {
    redis: { host, port, user, password },
  },
} = require('@/configs');
const {
  timeConstants: { _5_SECOND, _10_SECOND },
  appConstants: { NODE_ENVS },
} = require('@/constants');
const {
  appHelpers: { isNodeEnvMatch },
} = require('@/helpers');

class IoRedisConnection {
  constructor() {
    this.options = {
      host,
      port,
      username: user,
      password,
      connectTimeout: _10_SECOND,
    };

    this.client = new IOREDIS(this.options);
    this.connectTimeout = undefined;
    this.isConnected = false;

    this.client.on('connect', () => this.handleEventConnect(this.client));
    this.client.on('error', err => this.handleConnectionError(err));
    this.client.on('ready', () => this.handleEventConnect(this.client));
  }

  handleTimeoutError() {
    this.connectTimeout = setTimeout(() => {
      console.error('Failed to connect to Redis database');
      throw new Error('Failed to connect to Redis database');
    }, _10_SECOND);
  }

  handleEventConnect(client) {
    if (!this.isConnected && client.status === 'ready') {
      console.info('CONNECTED TO REDIS SUCCESS 🔴 !!');
      this.isConnected = true;
      clearTimeout(this.connectTimeout);
    }
  }

  handleConnectionError(err) {
    console.error('Redis connection error', err);
    this.isConnected = false;
    const status = this.client.status;
    if (status !== 'connecting' && status !== 'connect') {
      this.initCache();
    }
  }

  async initCache(retries = 10) {
    if (isNodeEnvMatch(NODE_ENVS[0])) {
      process.env.DEBUG = 'ioredis:*';
    }

    try {
      if (this.client.status !== 'ready' && this.client.status !== 'connecting' && this.client.status !== 'connect') {
        await this.client.connect();
      }
    } catch (err) {
      console.error('Failed to connect to Redis database', err);
      if (retries > 0) {
        console.info(`Retrying to connect... (${10 - retries + 1}/10)`);
        setTimeout(() => this.initCache(retries - 1), _5_SECOND);
      } else {
        this.handleTimeoutError();
      }
    }
  }

  getClient() {
    return this.client;
  }

  closeClient() {
    if (this.client) {
      clearTimeout(this.connectTimeout);
      this.client.quit(() => {
        console.info('Disconnected from Redis database.');
      });
    }
  }
}

module.exports = new IoRedisConnection();
