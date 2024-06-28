const { NODE_ENV } = require("../constants/appConstants");

/**
 * Checks if the current Node environment matches the specified environment.
 * @param {string} [node=NODE_ENV] - The Node environment to check against. Defaults to the value of `process.env.NODE_ENV`.
 * @returns {boolean} - Returns `true` if the current Node environment matches the specified environment, `false` otherwise.
 */
const isNodeEnvMatch = (node = NODE_ENV) => {
  return process.env.NODE_ENV === node;
};

module.exports = { isNodeEnvMatch };
