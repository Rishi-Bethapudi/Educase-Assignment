const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/dataBase');

if (!sequelize) {
  throw new Error('Sequelize instance is undefined. Check DB connection.');
}

const School = sequelize.define(
  'schools',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: -90,
        max: 90,
      },
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: -180,
        max: 180,
      },
    },
  },
  {
    tableName: 'schools',
    timestamps: false,
  }
);

module.exports = School;
