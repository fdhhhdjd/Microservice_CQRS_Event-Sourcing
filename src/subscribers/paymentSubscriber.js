const { initRabbit } = require('@/dbs');
const {
  handleProductReservation,
} = require('@/app/v1/services/productService');
const {
  eventConstants: { PAYMENT_PROCESSED },
  messageQueueConstants: { PAYMENT, PROCESSED },
} = require('@/constants');
const {
  messageQueueHelpers: { generateQueueName },
} = require('@/helpers');

const message = generateQueueName({ feature: PAYMENT, action: PROCESSED });

initRabbit.consume(message, async msgContent => {
  try {
    const event = JSON.parse(msgContent);

    if (event.eventType === PAYMENT_PROCESSED) {
      console.log(event);
      await handleProductReservation(event.aggregateId, {
        productId: event.eventData.productId,
      });
    }
  } catch (error) {
    console.error('Failed to process payment message', error);
  }
});
