'use strict';

const {
  appConstants: { NODE_ENVS },
} = require('@/constants');

/**
 * Checks if the current Node environment matches the specified environment.
 * @param {string} [node=NODE_ENV] - The Node environment to check against. Defaults to the value of `process.env.NODE_ENV`.
 * @returns {boolean} - Returns `true` if the current Node environment matches the specified environment, `false` otherwise.
 */
const isNodeEnvMatch = (node = NODE_ENVS[0]) => {
  return process.env.NODE_ENV === node;
};

/**
 * Generates CORS options for use in Express applications.
 * @returns {Object} The CORS configuration object.
 */
const getCorsOptions = () => {
  return {
    origin: [
      'http://localhost:5173',
      'http://127.0.0.1:5173',
      'https://profile-forme.com',
    ],
    methods: 'GET, POST, PUT, DELETE, OPTIONS',
    allowedHeaders:
      'Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With, X-Device-Id',
  };
};

/**
 * Determines the appropriate Morgan logging format based on the Node environment.
 * @returns {string} The Morgan format string.
 */
const getMorganFormat = () => {
  return isNodeEnvMatch() ? 'dev' : 'combined';
};

module.exports = { isNodeEnvMatch, getCorsOptions, getMorganFormat };
