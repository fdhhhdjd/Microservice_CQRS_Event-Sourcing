const { initRabbit } = require('@/dbs');
const { handleNotification } = require('@/app/v1/services/notificationService');
const {
  eventConstants: { PRODUCT_RESERVED },
  messageQueueConstants: { PRODUCT, RESERVED },
} = require('@/constants');
const {
  messageQueueHelpers: { generateQueueName },
} = require('@/helpers');

const message = generateQueueName({ feature: PRODUCT, action: RESERVED });

initRabbit.consume(message, async msgContent => {
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
