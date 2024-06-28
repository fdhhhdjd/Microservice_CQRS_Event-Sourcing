const { NODE_ENV } = require("../constants/appConstants");

const DEV = {
  pg: {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    dialect: "postgres",
  },
};

const PRO = {
  pg: {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    dialect: "postgres",
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
