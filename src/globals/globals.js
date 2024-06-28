const dbConnection = require("../dbs/init.mongo");
const pgConnection = require("../dbs/init.pg");
const rabbitConnection = require("../dbs/init.rabbit");

const connectInit = async () => {
  //* MongoDB
  await dbConnection.initDatabase();

  //* PostgreSQL
  await pgConnection.initDatabase();

  //* RabbitMQ
  await rabbitConnection.connect();
};

connectInit();
