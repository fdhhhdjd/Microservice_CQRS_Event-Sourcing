const {
  eventConstants: { PRODUCT_RESERVED },
  messageQueueConstants: { PRODUCT, RESERVED },
} = require('@/constants');
const { initRabbit } = require('@/dbs');
const { Product } = require('@/commands/models');
const { saveEvent } = require('@/events/handlers');
const {
  messageQueueHelpers: { generateQueueName },
} = require('@/helpers');

const reserveProduct = async (productId, productData) => {
  const message = generateQueueName({ feature: PRODUCT, action: RESERVED });

  const product = await Product.findOne({
    where: { id: productData.productId },
  });
  if (product) {
    product.stock -= 1;
    await product.save();
    const event = await saveEvent(productId, PRODUCT_RESERVED, productData);
    await initRabbit.publish(message, JSON.stringify(event));
    return event;
  } else {
    throw new Error('Product not found');
  }
};

module.exports = {
  reserveProduct,
};
