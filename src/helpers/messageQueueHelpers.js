const {
  messageQueueConstants: { MY_APP, SEND, ANONYMS },
} = require('@/constants');
const { getNodeApp } = require('./appHelpers');

const generateQueueName = ({
  app = MY_APP,
  env = getNodeApp(),
  feature = ANONYMS,
  action = SEND,
}) => {
  return `${app}.${env}.${feature}.${action}`;
};

module.exports = { generateQueueName };
