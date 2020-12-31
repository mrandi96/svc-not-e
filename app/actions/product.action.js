const { Product } = require('../models');

exports.createProduct = async (data) => {
  await Product.create(data);
  return 'product created';
};

exports.findAllProducts = async (options) => {
  const query = await Product.findAll({ ...options });
  return query;
};

exports.findOneProduct = async (options) => {
  const query = await Product.findOne({ ...options });
  return query;
};

exports.updateProduct = async (data, options) => {
  await Product.update(data, { ...options });
  return 'product updated';
};

exports.deleteProduct = async (options) => {
  await Product.destroy({ ...options });
  return 'product deleted';
};
