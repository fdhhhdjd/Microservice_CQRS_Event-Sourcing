const { initRabbit } = require('@/inits');
const {
  eventConstants: { NOTIFICATION_SENT },
  messageQueueConstants: { NOTIFICATION },
} = require('@/constants');
const { Notification } = require('@/commands/models');
const {
  messageQueueHelpers: { generateQueueName },
} = require('@/helpers');

class NotificationSentConsumer {
  constructor() {
    this.init();
  }

  init() {
    const message = generateQueueName({ feature: NOTIFICATION });
    initRabbit.consume(message, async msgContent => {
      await this.handleNotificationSent(msgContent);
    });
  }

  async handleNotificationSent(msgContent) {
    try {
      const event = JSON.parse(msgContent);
      if (event.eventType === NOTIFICATION_SENT) {
        const notification = new Notification({
          id: event.eventId,
          message: event.eventData.message,
          status: 'SENT',
        });

        await notification.save();
        console.log('NotificationQueue handled NOTIFICATION_SENT event:', event);
      }
    } catch (error) {
      console.error('Failed to process notification message', error);
    }
  }
}

module.exports = new NotificationSentConsumer();
