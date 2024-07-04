const { PaymentHandlers } = require('@/commands/handlers');

class PaymentService {
  static async handlePayment(paymentId, paymentData) {
    return await PaymentHandlers.processPayment(paymentId, paymentData);
  }
}

module.exports = PaymentService;
