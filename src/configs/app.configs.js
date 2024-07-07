'use strict';

require('dotenv').config();

const {
  appConstants: { NODE_ENVS },
} = require('@/constants');

const DEV = {
  app: {
    port: process.env.PORT || 5000,
    node: process.env.NODE_ENV,
  },
};

const PRO = {
  app: {
    port: process.env.PORT || 5000,
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

const env = process.env.NODE_ENV || NODE_ENVS[0];

module.exports = getConfigs(env);
