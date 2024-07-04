const {
  eventConstants: { PAYMENT_PROCESSED },
  messageQueueConstants: { PAYMENT, PROCESSED },
} = require('@/constants');
const { initRabbit } = require('@/inits');
const { Payment } = require('@/commands/models');
const { EventHandler } = require('@/events/handlers');
const {
  messageQueueHelpers: { generateQueueName },
} = require('@/helpers');

class PaymentHandlers {
  static async processPayment(paymentId, paymentData) {
    const message = generateQueueName({ feature: PAYMENT, action: PROCESSED });

    const newPayment = await Payment.create({ id: paymentId, ...paymentData });
    const paymentValues = newPayment?.dataValues;

    const event = await EventHandler.saveEvent(paymentId, PAYMENT_PROCESSED, {
      paymentId: paymentValues.id,
      ...paymentData,
    });

    await initRabbit.publish(message, JSON.stringify(event));
    return event;
  }
}

module.exports = PaymentHandlers;
