const { DataTypes } = require('sequelize');

const SequelizePGConnection = require('@/dbs/init.sequelizePG');

const Payment = SequelizePGConnection.sequelize.define(
  'Payment',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    orderId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'PROCESSED',
    },
  },
  {
    tableName: 'Payment',
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

module.exports = Payment;
