'use strict';

const { Created, Ok } = require('@/cors');
const ProductServices = require('@/app/v1/services/productService');

class ProductControllers {
  async createProduct(req, res, __) {
    new Created({
      metadata: await ProductServices.createProduct(req.body),
    }).send(res);
  }

  async getAllProducts(req, res, __) {
    new Ok({
      metadata: await ProductServices.getAllProducts(req.body),
    }).send(res);
  }

  async getProductDetails(req, res, __) {
    new Ok({
      metadata: await ProductServices.getProductDetails(req.params.productId),
    }).send(res);
  }
}

module.exports = new ProductControllers();
