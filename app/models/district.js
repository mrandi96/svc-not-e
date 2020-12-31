const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');

const District = sequelize.define('District', {
  districtId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  districtName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  provinceId: {
    type: DataTypes.INTEGER,
    model: 'Province',
    key: 'provinceId'
  }
}, {
  tableName: 'district'
});

module.exports = District;
