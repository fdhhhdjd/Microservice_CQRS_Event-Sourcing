const { processPayment } = require('@/commands/handlers');

const handlePayment = async (paymentId, paymentData) => {
  return await processPayment(paymentId, paymentData);
};

module.exports = { handlePayment };
