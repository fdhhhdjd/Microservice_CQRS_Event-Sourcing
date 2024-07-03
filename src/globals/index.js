const { initSequelizePG, initMongo, initRabbit, initIoRedis } = require('@/inits');

(async () => {
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
})();
