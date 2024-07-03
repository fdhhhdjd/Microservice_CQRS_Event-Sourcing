const { NotificationHandlers } = require('@/commands/handlers');

const handleNotification = async (notificationId, notificationData) => {
  return await NotificationHandlers.sendNotification(notificationId, notificationData);
};

module.exports = { handleNotification };
