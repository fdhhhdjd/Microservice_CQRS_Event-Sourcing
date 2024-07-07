'use strict';

const { v4: uuidv4 } = require('uuid');

const {
  eventConstants: { ORDER_CREATED },
  messageQueueConstants: { ORDER, CREATED },
} = require('@/constants');
const { initRabbit } = require('@/inits');
const { Order } = require('@/commands/models');
const { EventHandler } = require('@/events/handlers');
const {
  messageQueueHelpers: { generateQueueName },
} = require('@/helpers');
const { BadRequestRequestError } = require('@/cors');

class OrderHandlers {
  static async createOrder(orderData) {
    const aggregateId = uuidv4();
    const message = generateQueueName({ feature: ORDER, action: CREATED });

    const eventData = {
      amount: orderData.amount,
      productId: orderData.productId,
    };

    const newOrder = await Order.create(eventData);
    const orderValues = newOrder?.dataValues;

    if (!orderValues) {
      throw new BadRequestRequestError();
    }

    const event = await EventHandler.saveEvent(aggregateId, ORDER_CREATED, {
      orderId: orderValues?.id,
      amount: orderData.amount,
      productId: orderData.productId,
    });

    await initRabbit.publish(message, JSON.stringify(event));
    return event;
  }
}

module.exports = OrderHandlers;
