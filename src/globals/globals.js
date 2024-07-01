const { initSequelizePG, initMongo, initRabbit } = require('@/dbs');

(async () => {
  //* MongoDB
  await initMongo.initDatabase();

  //* PostgreSQL
  await initSequelizePG.initDatabase();

  //* RabbitMQ
  await initRabbit.connect();

  require('@/subscribers/orderSubscriber');
  require('@/subscribers/paymentSubscriber');
  require('@/subscribers/productSubscriber');
  require('@/subscribers/notificationSubscriber');
})();
