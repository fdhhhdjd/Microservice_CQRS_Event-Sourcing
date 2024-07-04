const { initRabbit } = require('@/inits');
const PaymentService = require('@/app/v1/services/paymentService');
const {
  eventConstants: { ORDER_CREATED },
  messageQueueConstants: { ORDER, CREATED },
} = require('@/constants');
const {
  messageQueueHelpers: { generateQueueName },
} = require('@/helpers');
const { OrderModel } = require('@/app/v1/models');

class OrderCreatedConsumer {
  constructor() {
    this.init();
  }

  init() {
    const message = generateQueueName({ feature: ORDER, action: CREATED });
    initRabbit.consume(message, async msgContent => {
      if (!msgContent) {
        console.error('Message content is undefined or null');
        return;
      }
      await this.handleOrderCreated(msgContent);
    });
  }

  async handleOrderCreated(msgContent) {
    try {
      const event = JSON.parse(msgContent);
      if (event.eventType === ORDER_CREATED) {
        const order = new OrderModel({
          _id: event.eventData.orderId,
          amount: event.eventData.amount,
          productId: event.eventData.productId,
        });

        await order.save();
        await PaymentService.handlePayment(event.aggregateId, {
          amount: event.eventData.amount,
          orderId: event.eventData.orderId,
          productId: event.eventData.productId,
        });
      }
    } catch (error) {
      console.error('Error parsing message content:', error);
    }
  }
}

module.exports = new OrderCreatedConsumer();
