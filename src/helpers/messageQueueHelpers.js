const {
  messageQueueConstants: { MY_APP, SEND, ANONYMS },
} = require('@/constants');
const { getNodeApp } = require('./appHelpers');

/**
 * Generates a queue name based on the provided parameters.
 *
 * @param {Object} options - The options object.
 * @param {string} [options.app=MY_APP] - The app name.
 * @param {string} [options.env=getNodeApp()] - The environment.
 * @param {string} [options.feature=ANONYMS] - The feature.
 * @param {string} [options.action=SEND] - The action.
 * @returns {string} The generated queue name.
 */
const generateQueueName = ({
  app = MY_APP,
  env = getNodeApp(),
  feature = ANONYMS,
  action = SEND,
}) => {
  return `${app}.${env}.${feature}.${action}`;
};

module.exports = { generateQueueName };
