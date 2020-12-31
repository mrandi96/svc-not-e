const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');

const Country = sequelize.define('Country', {
  countryId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  countryName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phonePrefix: {
    type: DataTypes.STRING,
    defaultValue: ''
  }
}, {
  tableName: 'country'
});

module.exports = Country;
