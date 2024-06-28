const rabbitConnection = require("../dbs/init.rabbit");
const { handlePayment } = require("../app/services/paymentService");
const { ORDER_CREATED } = require("../events/eventTypes");

rabbitConnection.consume("OrderQueue", async (msgContent) => {
  if (!msgContent) {
    console.error("Message content is undefined or null");
    return;
  }
  try {
    const event = JSON.parse(msgContent); // Parse the string to get the event object
    if (event.eventType === ORDER_CREATED) {
      // Check eventType on the event object
      await handlePayment(event.aggregateId, {
        amount: event.eventData.amount,
        orderId: event.eventData.orderId,
      });
    }
  } catch (error) {
    console.error("Error parsing message content:", error);
  }
});
