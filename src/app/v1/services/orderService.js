const { OrderHandlers } = require('@/commands/handlers');

const createNewOrder = async orderData => {
  return await OrderHandlers.createOrder(orderData);
};

module.exports = { createNewOrder };
