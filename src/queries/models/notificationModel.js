const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: 'SENT',
    },
  },
  { timestamps: true },
);

const NotificationRepo = mongoose.model('Notification', notificationSchema);

module.exports = NotificationRepo;
