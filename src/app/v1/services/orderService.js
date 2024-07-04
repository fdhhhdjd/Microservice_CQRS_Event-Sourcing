const { OrderHandlers } = require('@/commands/handlers');

class OrderService {
  static async createNewOrder(orderData) {
    return await OrderHandlers.createOrder(orderData);
  }
}

module.exports = OrderService;
