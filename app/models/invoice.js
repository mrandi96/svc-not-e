const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');

const Invoice = sequelize.define('Invoice', {
  invoiceId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  invoiceCode: {
    type: DataTypes.STRING,
    allowNull: false
  },
  shopId: {
    type: DataTypes.INTEGER,
    model: 'Shop',
    key: 'shopId'
  },
  totalPrice: {
    type: DataTypes.DOUBLE,
    defaultValue: 0.0
  },
  productInsertMode: {
    type: DataTypes.ENUM('inside', 'outside')
  },
  customerName: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'invoice',
  timestamps: true,
  paranoid: true
});

module.exports = Invoice;
