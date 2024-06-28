const { createOrder } = require("../../handlers/handlers");

const createNewOrder = async (orderId, orderData) => {
  return await createOrder(orderId, orderData);
};

module.exports = { createNewOrder };
