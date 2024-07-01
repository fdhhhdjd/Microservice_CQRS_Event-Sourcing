'use strict';

const { Created } = require('@/cors');
const ProductServices = require('@/app/v1/services/productService');

class ProductControllers {
  async createProduct(req, res, __) {
    new Created({
      metadata: await ProductServices.createProduct(req.body),
    }).send(res);
  }
}

module.exports = new ProductControllers();
