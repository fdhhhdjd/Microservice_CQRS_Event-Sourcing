const { initRabbit } = require('@/inits');
const {
  eventConstants: { NOTIFICATION_SENT },
  messageQueueConstants: { NOTIFICATION },
} = require('@/constants');
const { Notification } = require('@/commands/models');
const {
  messageQueueHelpers: { generateQueueName },
} = require('@/helpers');

const message = generateQueueName({ feature: NOTIFICATION });

initRabbit.consume(message, async msgContent => {
  const event = JSON.parse(msgContent);
  if (event.eventType === NOTIFICATION_SENT) {
    // Save the notification to the database
    const notification = new Notification({
      id: event.eventId,
      message: event.eventData.message,
      status: 'SENT',
    });
    await notification.save();
    console.log('NotificationQueue handled NOTIFICATION_SENT event:', event);
  }
});
