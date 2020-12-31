const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');

const Province = sequelize.define('Province', {
  provinceId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  provinceName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  countryId: {
    type: DataTypes.INTEGER,
    model: 'Country',
    key: 'countryId'
  }
}, {
  tableName: 'province'
});

module.exports = Province;
