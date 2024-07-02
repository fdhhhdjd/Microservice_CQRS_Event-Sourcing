require('dotenv').config();

const {
  appConstants: { NODE_ENVS },
} = require('@/constants');

const DEV = {
  mongo: {
    host: process.env.MONGO_INIT_DB_HOST,
    port: process.env.MONGO_INIT_DB_PORT,
    user: process.env.MONGO_INIT_DB_ROOT_USERNAME,
    password: process.env.MONGO_INIT_DB_ROOT_PASSWORD,
    database: process.env.MONGO_INIT_DB_DATABASE,
    source: process.env.MONGO_INIT_DB_SOURCE,
    link:
      'mongodb://${username}:${password}@${host}:${port}/${database}?authMechanism=DEFAULT&authSource=${source}',
  },
};

const PRO = {
  mongo: {
    host: process.env.MONGO_INIT_DB_HOST,
    port: process.env.MONGO_INIT_DB_PORT,
    user: process.env.MONGO_INIT_DB_ROOT_USERNAME,
    password: process.env.MONGO_INIT_DB_ROOT_PASSWORD,
    source: process.env.MONGO_INIT_DB_SOURCE,
    link:
      'mongodb://${username}:${password}@${host}:${port}/${database}?authMechanism=DEFAULT&authSource=${source}',
  },
};

const configs = {
  DEV,
  PRO,
};

const getConfigs = env => {
  if (env === process.env.NODE_ENV) return configs.DEV;
  if (env === process.env.NODE_ENV) return configs.PRO;
  return null;
};

const env = process.env.NODE_ENV || NODE_ENVS[0];

module.exports = getConfigs(env);
