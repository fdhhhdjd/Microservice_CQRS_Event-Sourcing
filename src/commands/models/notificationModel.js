const SequelizePGConnection = require("../../dbs/init.sequelizePG");

const { DataTypes } = require("sequelize");

const Notification = SequelizePGConnection.sequelize.define(
  "Notification",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "SENT",
    },
  },
  {
    tableName: "Notification",
    timestamps: true,
  }
);

(async () => {
  try {
    await SequelizePGConnection.sequelize.sync({ force: false });
  } catch (error) {
    console.error("Unable to sync the database:", error);
  }
})();

module.exports = Notification;
