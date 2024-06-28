const SequelizePGConnection = require("../dbs/init.sequelizePG");
const { DataTypes } = require("sequelize");

const Payment = SequelizePGConnection.sequelize.define("Payment", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "PROCESSED",
  },
});

SequelizePGConnection.sequelize.sync();

module.exports = Payment;
