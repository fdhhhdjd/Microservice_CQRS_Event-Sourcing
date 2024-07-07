'use strict';

const { initRabbit } = require('@/inits');
const NotificationService = require('@/app/v1/services/notificationService');
const {
  eventConstants: { PRODUCT_RESERVED, PRODUCT_CREATED },
  messageQueueConstants: { PRODUCT, RESERVED, CREATED },
} = require('@/constants');
const {
  messageQueueHelpers: { generateQueueName },
} = require('@/helpers');
const { ProductModel } = require('@/queries/models');

class ProductSubscriber {
  constructor() {
    this.init();
  }

  init() {
    this.consumeProductReserved();
    this.consumeProductCreated();
  }

  consumeProductReserved() {
    const messageReserved = generateQueueName({ feature: PRODUCT, action: RESERVED });
    initRabbit.consume(messageReserved, async msgContent => {
      await this.handleProductReserved(msgContent);
    });
  }

  consumeProductCreated() {
    const messageCreateProduct = generateQueueName({ feature: PRODUCT, action: CREATED });
    initRabbit.consume(messageCreateProduct, async msgContent => {
      await this.handleProductCreated(msgContent);
    });
  }

  async handleProductReserved(msgContent) {
    try {
      const event = JSON.parse(msgContent);
      if (event.eventType === PRODUCT_RESERVED) {
        await ProductModel.updateOne(
          {
            _id: event.eventData.productId,
          },
          {
            $inc: { stock: -1 },
          },
        );
        await NotificationService.handleNotification(event.aggregateId, {
          message: 'Product reserved successfully',
        });
      }
    } catch (error) {
      console.error('Failed to process product reservation message', error);
    }
  }

  async handleProductCreated(msgContent) {
    try {
      const event = JSON.parse(msgContent);
      if (event.eventType === PRODUCT_CREATED) {
        const product = new ProductModel({
          _id: event.eventData.id,
          name: event.eventData.name,
          stock: event.eventData.stock,
        });

        await product.save();
      }
    } catch (error) {
      console.error('Failed to process product created message', error);
    }
  }
}

module.exports = new ProductSubscriber();
