const {
  eventConstants: { PRODUCT_RESERVED, PRODUCT_CREATED },
  messageQueueConstants: { PRODUCT, RESERVED, CREATED },
} = require('@/constants');
const { initRabbit } = require('@/inits');
const { Product } = require('@/commands/models');
const { EventHandler } = require('@/events/handlers');
const {
  messageQueueHelpers: { generateQueueName },
} = require('@/helpers');

class ProductHandlers {
  static async reserveProduct(productId, productData) {
    const message = generateQueueName({ feature: PRODUCT, action: RESERVED });

    const product = await Product.findOne({
      where: { id: productData.productId },
    });
    if (product) {
      product.stock -= 1;
      await product.save();
      const event = await EventHandler.saveEvent(productId, PRODUCT_RESERVED, productData);
      await initRabbit.publish(message, JSON.stringify(event));
      return event;
    } else {
      throw new Error('Product not found');
    }
  }

  static async newProduct(newDataProduct) {
    const message = generateQueueName({ feature: PRODUCT, action: CREATED });

    const product = await Product.create(newDataProduct);
    const event = await EventHandler.saveEvent(newDataProduct.id, PRODUCT_CREATED, newDataProduct);
    await initRabbit.publish(message, JSON.stringify(event));
    return product;
  }
}

module.exports = ProductHandlers;
