const { v4: uuidv4 } = require('uuid');

const { ProductHandlers } = require('@/commands/handlers');
const { BadRequestRequestError } = require('@/cors');

const handleProductReservation = async (productId, productData) => {
  return await ProductHandlers.reserveProduct(productId, productData);
};

const createProduct = async data => {
  if (!data.name || !data.stock) {
    throw new BadRequestRequestError();
  }

  return await ProductHandlers.newProduct({
    id: uuidv4(),
    name: data.name,
    stock: data.stock,
  });
};

module.exports = { handleProductReservation, createProduct };
