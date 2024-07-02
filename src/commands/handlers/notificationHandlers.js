const {
  eventConstants: { NOTIFICATION_SENT },
  messageQueueConstants: { NOTIFICATION },
} = require('@/constants');
const { initRabbit } = require('@/dbs');
const { saveEvent } = require('@/events/handlers');
const {
  messageQueueHelpers: { generateQueueName },
} = require('@/helpers');

const sendNotification = async (notificationId, notificationData) => {
  const event = await saveEvent(
    notificationId,
    NOTIFICATION_SENT,
    notificationData,
  );
  const message = generateQueueName({ feature: NOTIFICATION });
  await initRabbit.publish(message, JSON.stringify(event));
  return event;
};

module.exports = {
  sendNotification,
};
