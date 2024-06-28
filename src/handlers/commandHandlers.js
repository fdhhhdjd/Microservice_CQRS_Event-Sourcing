// src/handlers/commandHandlers.js
const { saveEvent } = require("../events/eventStore");
const {
  ORDER_CREATED,
  PAYMENT_PROCESSED,
  PRODUCT_RESERVED,
  NOTIFICATION_SENT,
} = require("../events/eventTypes");
const { publish } = require("../events/rabbitmq");

const createOrder = async (orderId, orderData) => {
  const event = await saveEvent(orderId, ORDER_CREATED, orderData);
  await publish("OrderQueue", JSON.stringify(event));
  return event;
};

const processPayment = async (paymentId, paymentData) => {
  const event = await saveEvent(paymentId, PAYMENT_PROCESSED, paymentData);
  await publish("PaymentQueue", JSON.stringify(event));
  return event;
};

const reserveProduct = async (productId, productData) => {
  const event = await saveEvent(productId, PRODUCT_RESERVED, productData);
  await publish("ProductQueue", JSON.stringify(event));
  return event;
};

const sendNotification = async (notificationId, notificationData) => {
  const event = await saveEvent(
    notificationId,
    NOTIFICATION_SENT,
    notificationData
  );
  await publish("NotificationQueue", JSON.stringify(event));
  return event;
};

module.exports = {
  createOrder,
  processPayment,
  reserveProduct,
  sendNotification,
};
