const { v4: uuidv4 } = require('uuid');

const { reserveProduct } = require('@/commands/handlers/handlers');
const product = require('@/commands/models/productModel');
const { BadRequestRequestError } = require('@/cors/error.response');

const handleProductReservation = async (productId, productData) => {
  return await reserveProduct(productId, productData);
};

const createProduct = async data => {
  if (!data.name || !data.stock) {
    throw new BadRequestRequestError();
  }
  return product.create({
    id: uuidv4(),
    name: data.name,
    stock: data.stock,
  });
};

module.exports = { handleProductReservation, createProduct };
