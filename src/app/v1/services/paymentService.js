const { PaymentHandlers } = require('@/commands/handlers');

const handlePayment = async (paymentId, paymentData) => {
  return await PaymentHandlers.processPayment(paymentId, paymentData);
};

module.exports = { handlePayment };
