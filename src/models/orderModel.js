const SequelizePGConnection = require("../dbs/init.sequelizePG");

const { DataTypes } = require("sequelize");

const Order = SequelizePGConnection.sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
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
  },
  {
    tableName: "Order",
    timestamps: true,
  }
);

(async () => {
  try {
    await SequelizePGConnection.sequelize.sync();
  } catch (error) {
    console.error("Unable to sync the database:", error);
  }
})();
module.exports = Order;
