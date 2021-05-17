const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');

const Regency = sequelize.define('Regency', {
  regencyId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  regencyName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  provinceId: {
    type: DataTypes.INTEGER,
    model: 'Province',
    key: 'provinceId'
  }
}, {
  tableName: 'regency'
});

module.exports = Regency;
