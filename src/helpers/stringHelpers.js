/**
 * Replaces template strings in a given template with corresponding values from the data object.
 * @param {string} template - The template string containing placeholders.
 * @param {object} data - The data object containing key-value pairs for replacement.
 * @returns {string} - The modified template string with replaced values.
 */
const replaceTemplateStrings = (template, data) =>
  template.replace(/\$\{(.*?)\}/g, (_, key) => String(data[key] || ""));

module.exports = { replaceTemplateStrings };
