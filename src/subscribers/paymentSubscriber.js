const rabbitConnection = require("../dbs/init.rabbit");
const { handleProductReservation } = require("../app/services/productService");
const { PAYMENT_PROCESSED } = require("../events/eventTypes");

rabbitConnection.consume("PaymentQueue", async (msgContent) => {
  try {
    const event = JSON.parse(msgContent);

    console.log(msgContent, "-----");

    if (event.eventType === PAYMENT_PROCESSED) {
      await handleProductReservation(event.aggregateId, {
        productId: event.eventData.productId,
      });
    }
  } catch (error) {
    console.error("Failed to process payment message", error);
  }
});
