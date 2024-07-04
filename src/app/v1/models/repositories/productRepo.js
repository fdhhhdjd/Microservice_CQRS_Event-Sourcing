const { ProductModel } = require('@/app/v1/models');

class ProductRepository {
  static async getAllProducts() {
    return await ProductModel.find().lean();
  }

  static async getProductDetails(productId) {
    return await ProductModel.findById({
      _id: productId,
    });
  }
}

module.exports = ProductRepository;
