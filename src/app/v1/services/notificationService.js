const { NotificationHandlers } = require('@/commands/handlers');

class NotificationService {
  static async handleNotification(notificationId, notificationData) {
    return await NotificationHandlers.sendNotification(notificationId, notificationData);
  }
}

module.exports = NotificationService;
