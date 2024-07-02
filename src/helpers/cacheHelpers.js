'use strict';

/**
 * Generates a cache key based on the provided parameters.
 *
 * @param {Object} options - The options for generating the cache key.
 * @param {string} options.namespace - The namespace for the cache key.
 * @param {string} options.type - The type for the cache key.
 * @param {string} options.identifier - The identifier for the cache key.
 * @returns {string} The generated cache key.
 */
const generateCacheKey = ({ namespace, type, identifier }) => {
  return `${namespace}:${type}:${identifier}`;
};

module.exports = { generateCacheKey };
