'use strict';

const { initSequelizePG, initMongo, initRabbit, initIoRedis } = require('@/inits');

class ApplicationInitializer {
  static async init() {
    //* MongoDB
    await initMongo.initDatabase();

    //* PostgreSQL
    await initSequelizePG.initDatabase();

    //* RabbitMQ
    await initRabbit.connect();

    //* RedisIO
    await initIoRedis.initCache();

    require('@/subscribers/orderSubscriber');
    require('@/subscribers/paymentSubscriber');
    require('@/subscribers/productSubscriber');
    require('@/subscribers/notificationSubscriber');
  }
}

ApplicationInitializer.init();
