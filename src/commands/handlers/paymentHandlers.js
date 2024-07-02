const {
  eventConstants: { PAYMENT_PROCESSED },
  messageQueueConstants: { PAYMENT, PROCESSED },
} = require('@/constants');
const { initRabbit } = require('@/dbs');
const { Payment } = require('@/commands/models');
const { saveEvent } = require('@/events/handlers');
const {
  messageQueueHelpers: { generateQueueName },
} = require('@/helpers');

const processPayment = async (paymentId, paymentData) => {
  const message = generateQueueName({ feature: PAYMENT, action: PROCESSED });

  const event = await saveEvent(paymentId, PAYMENT_PROCESSED, paymentData);
  await Payment.create({ id: paymentId, ...paymentData });

  await initRabbit.publish(message, JSON.stringify(event));
  return event;
};

module.exports = {
  processPayment,
};
