const { NODE_ENV } = require("../constants/appConstants");

const DEV = {
  mongo: {
    host: process.env.POSTGRES_HOST,
    port: process.env.MONGO_INIT_DB_PORT,
    user: process.env.MONGO_INIT_DB_ROOT_USERNAME,
    password: process.env.MONGO_INIT_DB_ROOT_PASSWORD,
    source: process.env.MONGO_INIT_DB_SOURCE,
    link: "mongodb://${username}:${password}@{host}:${port}/?authMechanism=DEFAULT&authSource=${source}",
  },
};

const PRO = {
  mongo: {
    host: process.env.POSTGRES_HOST,
    port: process.env.MONGO_INIT_DB_PORT,
    user: process.env.MONGO_INIT_DB_ROOT_USERNAME,
    password: process.env.MONGO_INIT_DB_ROOT_PASSWORD,
    source: process.env.MONGO_INIT_DB_SOURCE,
    link: "mongodb://${username}:${password}@{host}:${port}/?authMechanism=DEFAULT&authSource=${source}",
  },
};

const configs = {
  DEV,
  PRO,
};

const getConfigs = (env) => {
  if (env === process.env.NODE_ENV) return configs.DEV;
  if (env === process.env.NODE_ENV) return configs.PRO;
  return null;
};

const env = process.env.NODE_ENV || NODE_ENV;

module.exports = getConfigs(env);
