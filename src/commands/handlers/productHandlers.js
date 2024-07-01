const {
  eventConstants: { PRODUCT_RESERVED },
} = require('@/constants');
const { initRabbit } = require('@/dbs');
const { Product } = require('@/commands/models');
const { saveEvent } = require('@/events/handlers');

const reserveProduct = async (productId, productData) => {
  const product = await Product.findOne({
    where: { id: productData.productId },
  });
  if (product) {
    product.stock -= 1;
    await product.save();
    const event = await saveEvent(productId, PRODUCT_RESERVED, productData);
    await initRabbit.publish('ProductQueue', JSON.stringify(event));
    return event;
  } else {
    throw new Error('Product not found');
  }
};

module.exports = {
  reserveProduct,
};
