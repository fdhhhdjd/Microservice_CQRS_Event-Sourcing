require('dotenv').config();

const {
  appConstants: { NODE_ENV },
} = require('@/constants');

const DEV = {
  app: {
    port: process.env.PORT,
    node: process.env.NODE_ENV,
  },
};

const PRO = {
  app: {
    port: process.env.PORT,
    node: process.env.NODE_ENV,
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

const env = process.env.NODE_ENV || NODE_ENV;

module.exports = getConfigs(env);
