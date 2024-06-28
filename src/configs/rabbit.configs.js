const { NODE_ENV } = require("../constants/appConstants");

const DEV = {
  rabbit: {
    host: process.env.RABBIT_MQ_HOST,
    port: process.env.RABBIT_MQ_SERVER,
    user: process.env.RABBIT_MQ_DEFAULT_USER,
    password: process.env.RABBIT_MQ_DEFAULT_PASS,
    link: "amqp://${username}:{password}@${host}:{port}",
  },
};

const PRO = {
  rabbit: {
    host: process.env.RABBIT_MQ_HOST,
    port: process.env.RABBIT_MQ_SERVER,
    user: process.env.RABBIT_MQ_DEFAULT_USER,
    password: process.env.RABBIT_MQ_DEFAULT_PASS,
    link: "amqp://${username}:{password}@${host}:{port}",
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
