const { v4: uuidv4 } = require('uuid');

const { ProductHandlers } = require('@/commands/handlers');
const { BadRequestRequestError } = require('@/cors');

const { ProductRepo } = require('../../../queries/models/repositories');

class ProductService {
  static async getAllProducts() {
    return await ProductRepo.getAllProducts();
  }

  static async getProductDetails(productId) {
    return await ProductRepo.getProductDetails(productId);
  }

  static async handleProductReservation(productId, productData) {
    return await ProductHandlers.reserveProduct(productId, productData);
  }

  static async createProduct(data) {
    if (!data.name || !data.stock) {
      throw new BadRequestRequestError();
    }

    return await ProductHandlers.newProduct({
      id: uuidv4(),
      name: data.name,
      stock: data.stock,
    });
  }
}

module.exports = ProductService;
