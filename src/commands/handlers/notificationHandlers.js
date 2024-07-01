const {
  eventConstants: { NOTIFICATION_SENT },
} = require('@/constants');
const { initRabbit } = require('@/dbs');
const { saveEvent } = require('@/events/handlers');

const sendNotification = async (notificationId, notificationData) => {
  const event = await saveEvent(
    notificationId,
    NOTIFICATION_SENT,
    notificationData,
  );
  await initRabbit.publish('NotificationQueue', JSON.stringify(event));
  return event;
};

module.exports = {
  sendNotification,
};
