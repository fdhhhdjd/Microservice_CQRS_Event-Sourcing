const { createOrder } = require('../../commands/handlers/handlers');

const createNewOrder = async orderData => {
  return await createOrder(orderData);
};

module.exports = { createNewOrder };
