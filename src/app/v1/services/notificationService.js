const { sendNotification } = require('@/commands/handlers');

const handleNotification = async (notificationId, notificationData) => {
  return await sendNotification(notificationId, notificationData);
};

module.exports = { handleNotification };
