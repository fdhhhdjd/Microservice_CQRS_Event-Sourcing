const { initRabbit } = require('@/dbs');
const { handleProductReservation } = require('@/app/services/productService');
const { PAYMENT_PROCESSED } = require('@/events/eventTypes');

initRabbit.consume('PaymentQueue', async msgContent => {
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
