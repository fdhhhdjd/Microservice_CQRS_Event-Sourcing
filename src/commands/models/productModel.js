'use strict';

const { DataTypes } = require('sequelize');

const SequelizePGConnection = require('@/inits/init.sequelizePG');

const Product = SequelizePGConnection.sequelize.define(
  'Product',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'Products',
    timestamps: true,
  },
);

(async () => {
  try {
    await SequelizePGConnection.sequelize.sync();
  } catch (error) {
    console.error('Unable to sync the database:', error);
  }
})();

module.exports = Product;
