const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');

const InvoiceProduct = sequelize.define('InvoiceProduct', {
  invoiceProductId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  invoiceId: {
    type: DataTypes.INTEGER,
    model: 'Invoice',
    key: 'invoiceId'
  },
  productId: {
    type: DataTypes.INTEGER,
    model: 'Product',
    key: 'productId'
  },
  productName: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  productPrice: {
    type: DataTypes.DOUBLE,
    defaultValue: 0.0
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: 'invoice_product'
});

module.exports = InvoiceProduct;
