'use strict';

const { Created } = require('@/cors');
const OrderServices = require('@/app/v1/services/orderService');

class OrderControllers {
  async createOrder(req, res, __) {
    new Created({
      metadata: await OrderServices.createNewOrder(req.body),
    }).send(res);
  }
}

module.exports = new OrderControllers();
