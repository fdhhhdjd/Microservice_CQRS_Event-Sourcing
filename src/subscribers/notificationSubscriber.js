const { initRabbit } = require('@/inits');
const {
  eventConstants: { NOTIFICATION_SENT },
  messageQueueConstants: { NOTIFICATION, SEND },
} = require('@/constants');
const { Notification } = require('@/commands/models');
const {
  messageQueueHelpers: { generateQueueName },
} = require('@/helpers');
const { NotificationModel } = require('@/app/v1/models');

class NotificationSentConsumer {
  constructor() {
    this.init();
  }

  init() {
    const message = generateQueueName({ feature: NOTIFICATION, action: SEND });
    initRabbit.consume(message, async msgContent => {
      await this.handleNotificationSent(msgContent);
    });
  }

  async handleNotificationSent(msgContent) {
    try {
      const event = JSON.parse(msgContent);
      if (event.eventType === NOTIFICATION_SENT) {
        const notification = new NotificationModel({
          _id: event.eventData.id,
          message: event.eventData.message,
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
