const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');

const Country = sequelize.define('Country', {
  countryId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  iso: {
    type: DataTypes.CHAR(2),
    allowNull: false
  },
  iso3: {
    type: DataTypes.CHAR(3)
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  niceName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  numCode: {
    type: DataTypes.INTEGER
  },
  phonePrefix: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'country'
});

module.exports = Country;
