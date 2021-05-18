const User = require('./user');
const Country = require('./country');
const Province = require('./province');
const Regency = require('./regency');
const Shop = require('./shop');
const Invoice = require('./invoice');
const Product = require('./product');
const InvoiceProduct = require('./invoiceProduct');

User.hasMany(Shop, { foreignKey: { name: 'ownerId' }, as: 'Shop' });

Country.hasMany(Province, { foreignKey: { name: 'countryId' }, as: 'Province' });
Country.hasMany(Shop, { foreignKey: { name: 'countryId' }, as: 'Shop' });

Province.belongsTo(Country, { foreignKey: { name: 'countryId' }, as: 'Country' });
Province.hasMany(Shop, { foreignKey: { name: 'provinceId' }, as: 'Shop' });

Regency.belongsTo(Country, { foreignKey: { name: 'countryId' }, as: 'Country' });
Regency.hasMany(Shop, { foreignKey: { name: 'regencyId' }, as: 'Shop' });

Shop.belongsTo(User, { foreignKey: { name: 'ownerId' }, as: 'Owner' });
Shop.belongsTo(Country, { foreignKey: 'countryId', as: 'Country' });
Shop.belongsTo(Province, { foreignKey: 'provinceId', as: 'Province' });
Shop.belongsTo(Regency, { foreignKey: 'regencyId', as: 'Regency' });
Shop.hasMany(Invoice, { foreignKey: { name: 'shopId' }, as: 'Invoice' });

Invoice.belongsTo(Shop, { foreignKey: { name: 'shopId' }, as: 'Shop' });
Invoice.hasMany(InvoiceProduct, { foreignKey: { name: 'invoiceId' }, as: 'InvoiceProduct' });

Product.belongsTo(Shop, { foreignKey: { name: 'shopId' }, as: 'Shop' });
Product.hasMany(InvoiceProduct, { foreignKey: { name: 'productId' }, as: 'InvoiceProduct' });

InvoiceProduct.belongsTo(Invoice, { foreignKey: { name: 'invoiceId' }, as: 'Invoice' });
InvoiceProduct.belongsTo(Product, { foreignKey: { name: 'productId' }, as: 'Product' });

module.exports = {
  User,
  Shop,
  Invoice,
  Product,
  InvoiceProduct,
  Country,
  Province,
  Regency
};
