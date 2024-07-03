const { initRabbit } = require('@/inits');
const { handleProductReservation } = require('@/app/v1/services/productService');
const {
  eventConstants: { PAYMENT_PROCESSED },
  messageQueueConstants: { PAYMENT, PROCESSED },
} = require('@/constants');
const {
  messageQueueHelpers: { generateQueueName },
} = require('@/helpers');
const { PaymentModel } = require('@/app/v1/models');

class PaymentProcessedConsumer {
  constructor() {
    this.init();
  }

  init() {
    const message = generateQueueName({ feature: PAYMENT, action: PROCESSED });
    initRabbit.consume(message, async msgContent => {
      await this.handlePaymentProcessed(msgContent);
    });
  }

  async handlePaymentProcessed(msgContent) {
    try {
      const event = JSON.parse(msgContent);
      if (event.eventType === PAYMENT_PROCESSED) {
        const payment = new PaymentModel({
          _id: event.eventData.paymentId,
          orderId: event.eventData.orderId,
          amount: event.eventData.amount,
        });

        await payment.save();
        await handleProductReservation(event.aggregateId, {
          productId: event.eventData.productId,
        });
      }
    } catch (error) {
      console.error('Failed to process payment message', error);
    }
  }
}

module.exports = new PaymentProcessedConsumer();
