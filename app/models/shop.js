const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');

const Shop = sequelize.define('Shop', {
  shopId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  shopName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ownerId: {
    type: DataTypes.INTEGER,
    model: 'User',
    key: 'userId'
  },
  countryId: {
    type: DataTypes.INTEGER
  },
  provinceId: {
    type: DataTypes.INTEGER
  },
  districtId: {
    type: DataTypes.INTEGER
  },
  addressDetail: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  contactNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  invoiceFormat: {
    type: DataTypes.STRING,
    defaultValue: ''
  }
}, {
  tableName: 'shop',
  timestamps: true,
  paranoid: true
});

module.exports = Shop;
