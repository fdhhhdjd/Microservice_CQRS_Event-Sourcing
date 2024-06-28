const SequelizePGConnection = require("../dbs/init.sequelizePG");

const { DataTypes } = require("sequelize");

const Product = SequelizePGConnection.sequelize.define("Product", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

SequelizePGConnection.sequelize.sync();

module.exports = Product;
