const { v4: uuidv4 } = require('uuid');

const { reserveProduct } = require('@/commands/handlers/handlers');
const product = require('@/commands/models/productModel');

const handleProductReservation = async (productId, productData) => {
  return await reserveProduct(productId, productData);
};

const createProduct = async data => {
  return product.create({
    id: uuidv4(),
    name: data.name,
    stock: data.stock,
  });
};

module.exports = { handleProductReservation, createProduct };
