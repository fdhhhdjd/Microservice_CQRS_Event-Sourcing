const rabbitConnection = require("../dbs/init.rabbit");
const { handleProductReservation } = require("../app/services/productService");
const { PAYMENT_PROCESSED } = require("../events/eventTypes");

rabbitConnection.consume("PaymentQueue", async (msgContent) => {
  try {
    const event = JSON.parse(msgContent);

    if (event.eventType === PAYMENT_PROCESSED) {
      console.log(event.eventData);
      await handleProductReservation(event.aggregateId, {
        productId: event.eventData.productId,
      });
    }
  } catch (error) {
    console.error("Failed to process payment message", error);
  }
});
