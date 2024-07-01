const { v4: uuidv4 } = require('uuid');

const { reserveProduct } = require('@/commands/handlers');
const { Product } = require('@/commands/models');
const { BadRequestRequestError } = require('@/cors');
const { ErrorCodes } = require('@/utils');

const handleProductReservation = async (productId, productData) => {
  return await reserveProduct(productId, productData);
};

const createProduct = async data => {
  if (!data.name || !data.stock) {
    throw new BadRequestRequestError();
  }
  return Product.create({
    id: uuidv4(),
    name: data.name,
    stock: data.stock,
  });
};

module.exports = { handleProductReservation, createProduct };
