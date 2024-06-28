const { reserveProduct } = require("../../handlers/handlers");
const product = require("../../models/productModel");
const { v4: uuidv4 } = require("uuid");

const handleProductReservation = async (productId, productData) => {
  return await reserveProduct(productId, productData);
};

const createProduct = async (data) => {
  return product.create({
    id: uuidv4(),
    name: data.name,
    stock: data.stock,
  });
};

module.exports = { handleProductReservation, createProduct };
