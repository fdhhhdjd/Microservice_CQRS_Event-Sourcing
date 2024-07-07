'use strict';

const {
  eventConstants: { NOTIFICATION_SENT },
  messageQueueConstants: { NOTIFICATION, SEND },
} = require('@/constants');
const { initRabbit } = require('@/inits');
const { EventHandler } = require('@/events/handlers');
const {
  messageQueueHelpers: { generateQueueName },
} = require('@/helpers');
const { Notification } = require('@/commands/models');
const { BadRequestRequestError } = require('@/cors');

class NotificationHandlers {
  static async sendNotification(notificationId, notificationData) {
    const notification = await Notification.create({
      message: notificationData.message,
      status: 'SENT',
    });
    const notificationValues = notification?.dataValues;

    if (!notificationValues) {
      throw new BadRequestRequestError();
    }

    const event = await EventHandler.saveEvent(notificationId, NOTIFICATION_SENT, {
      id: notificationValues?.id,
      message: notificationData.message,
    });
    const message = generateQueueName({ feature: NOTIFICATION, action: SEND });
    await initRabbit.publish(message, JSON.stringify(event));
    return event;
  }
}

module.exports = NotificationHandlers;
