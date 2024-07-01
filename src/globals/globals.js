const dbConnection = require('../dbs/init.mongo');
const SequelizePGConnection = require('../dbs/init.sequelizePG');
const rabbitConnection = require('../dbs/init.rabbit');

const connectInit = async () => {
  //* MongoDB
  await dbConnection.initDatabase();

  //* PostgreSQL
  await SequelizePGConnection.initDatabase();

  //* RabbitMQ
  await rabbitConnection.connect();

  require('../subscribers/orderSubscriber');
  require('../subscribers/paymentSubscriber');
  require('../subscribers/productSubscriber');
  require('../subscribers/notificationSubscriber');
};

connectInit();
