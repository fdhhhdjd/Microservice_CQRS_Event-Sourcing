const { initRabbit } = require('@/dbs');
const {
  eventConstants: { NOTIFICATION_SENT },
} = require('@/constants');
const { Notification } = require('@/commands/models');

initRabbit.consume('NotificationQueue', async msgContent => {
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
