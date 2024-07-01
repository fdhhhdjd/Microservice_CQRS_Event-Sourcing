const {
  eventConstants: { PAYMENT_PROCESSED },
} = require('@/constants');
const { initRabbit } = require('@/dbs');
const { Payment } = require('@/commands/models');
const { saveEvent } = require('@/events/handlers');

const processPayment = async (paymentId, paymentData) => {
  const event = await saveEvent(paymentId, PAYMENT_PROCESSED, paymentData);
  await Payment.create({ id: paymentId, ...paymentData });

  await initRabbit.publish('PaymentQueue', JSON.stringify(event));
  return event;
};

module.exports = {
  processPayment,
};
