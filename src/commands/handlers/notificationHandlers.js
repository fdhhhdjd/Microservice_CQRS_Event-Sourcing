const {
  eventConstants: { NOTIFICATION_SENT },
  messageQueueConstants: { NOTIFICATION },
} = require('@/constants');
const { initRabbit } = require('@/inits');
const { EventHandler } = require('@/events/handlers');
const {
  messageQueueHelpers: { generateQueueName },
} = require('@/helpers');

class NotificationHandlers {
  static async sendNotification(notificationId, notificationData) {
    const event = await EventHandler.saveEvent(notificationId, NOTIFICATION_SENT, notificationData);
    const message = generateQueueName({ feature: NOTIFICATION });
    await initRabbit.publish(message, JSON.stringify(event));
    return event;
  }
}

module.exports = NotificationHandlers;
