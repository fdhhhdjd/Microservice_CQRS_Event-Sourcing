const SequelizePGConnection = require("../dbs/init.sequelizePG");

const { DataTypes } = require("sequelize");

const Notification = SequelizePGConnection.sequelize.define("Notification", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "SENT",
  },
});

SequelizePGConnection.sequelize.sync();

module.exports = Notification;
