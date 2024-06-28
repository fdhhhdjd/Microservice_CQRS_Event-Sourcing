const SequelizePGConnection = require("../dbs/init.sequelizePG");

const { DataTypes } = require("sequelize");

const Order = SequelizePGConnection.sequelize.define("Order", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  },
  productId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "CREATED",
  },
});

SequelizePGConnection.sequelize.sync();

module.exports = Order;
