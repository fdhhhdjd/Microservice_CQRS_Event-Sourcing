const { v4: uuidv4 } = require('uuid');

const {
  eventConstants: { ORDER_CREATED },
} = require('@/constants');
const { initRabbit } = require('@/dbs');
const { Order } = require('@/commands/models');
const { saveEvent } = require('@/events/handlers');

const createOrder = async orderData => {
  const aggregateId = uuidv4();

  const eventData = {
    orderId: uuidv4(),
    amount: orderData.amount,
    productId: orderData.productId,
  };

  const event = await saveEvent(aggregateId, ORDER_CREATED, eventData);

  await Order.create({ id: uuidv4(), ...eventData });

  await initRabbit.publish('OrderQueue', JSON.stringify(event));
  return event;
};

module.exports = {
  createOrder,
};
