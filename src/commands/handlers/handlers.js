const { v4: uuidv4 } = require('uuid');

const {
  eventConstants: {
    ORDER_CREATED,
    PAYMENT_PROCESSED,
    PRODUCT_RESERVED,
    NOTIFICATION_SENT,
  },
} = require('@/constants');
const { initRabbit } = require('@/dbs');
const { Order, Payment, Product } = require('@/commands/models');
const { saveEvent } = require('@/events/handlers');

const createOrder = async orderData => {
  const aggregateId = uuidv4();

  const eventData = {
    orderId: uuidv4(),
    amount: orderData.amount,
    productId: orderData.productId,
  };

  const event = await saveEvent(aggregateId, ORDER_CREATED, eventData);

  await Order.create({ id: uuidv4(), ...eventData });

  await initRabbit.publish('OrderQueue', JSON.stringify(event));
  return event;
};

const processPayment = async (paymentId, paymentData) => {
  const event = await saveEvent(paymentId, PAYMENT_PROCESSED, paymentData);
  await Payment.create({ id: paymentId, ...paymentData });

  await initRabbit.publish('PaymentQueue', JSON.stringify(event));
  return event;
};

const reserveProduct = async (productId, productData) => {
  const product = await Product.findOne({
    where: { id: productData.productId },
  });
  if (product) {
    product.stock -= 1;
    await product.save();
    const event = await saveEvent(productId, PRODUCT_RESERVED, productData);
    await initRabbit.publish('ProductQueue', JSON.stringify(event));
    return event;
  } else {
    throw new Error('Product not found');
  }
};

const sendNotification = async (notificationId, notificationData) => {
  const event = await saveEvent(
    notificationId,
    NOTIFICATION_SENT,
    notificationData,
  );
  await initRabbit.publish('NotificationQueue', JSON.stringify(event));
  return event;
};

module.exports = {
  createOrder,
  processPayment,
  reserveProduct,
  sendNotification,
};
