const { initRabbit } = require('@/dbs');
const { handleNotification } = require('@/app/services/notificationService');
const { PRODUCT_RESERVED } = require('@/events/eventTypes');

initRabbit.consume('ProductQueue', async msgContent => {
  try {
    const event = JSON.parse(msgContent);
    if (event.eventType === PRODUCT_RESERVED) {
      await handleNotification(event.aggregateId, {
        message: 'Product reserved successfully',
      });
    }
  } catch (error) {
    console.error('Failed to process product reservation message', error);
  }
});
