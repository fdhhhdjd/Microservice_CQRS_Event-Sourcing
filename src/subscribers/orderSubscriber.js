const { initRabbit } = require('@/dbs');
const { handlePayment } = require('@/app/v1/services/paymentService');
const {
  eventConstants: { ORDER_CREATED },
} = require('@/constants');

initRabbit.consume('OrderQueue', async msgContent => {
  if (!msgContent) {
    console.error('Message content is undefined or null');
    return;
  }
  try {
    const event = JSON.parse(msgContent); // Parse the string to get the event object
    if (event.eventType === ORDER_CREATED) {
      // Check eventType on the event object
      await handlePayment(event.aggregateId, {
        amount: event.eventData.amount,
        orderId: event.eventData.orderId,
        productId: event.eventData.productId,
      });
    }
  } catch (error) {
    console.error('Error parsing message content:', error);
  }
});
