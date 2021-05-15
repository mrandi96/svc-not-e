const { CONFLICT, NOT_FOUND } = require('../libs/constants/httpStatus');
const { Product } = require('../models');

exports.createProduct = async (data, where) => {
  await this.findOneProduct(where, CONFLICT);
  await Product.create(data);

  return 'Product created';
};

exports.findAllProducts = async (where) => {
  const query = await Product.findAll({ where });

  return query;
};

exports.findOneProduct = async (where, type = NOT_FOUND) => {
  const query = await Product.findOne({ where });
  if (query && type === CONFLICT) {
    const e = new Error('Product name already exist');
    e.status = CONFLICT;
    throw e;
  } else if (!query && type === NOT_FOUND) {
    const e = new Error('Product not found');
    e.status = NOT_FOUND;
    throw e;
  }

  return query;
};

exports.updateProduct = async (data, where, conflictWhere) => {
  await this.findOneProduct(where);
  await this.findOneProduct(conflictWhere, CONFLICT);
  await Product.update(data, { where });

  return 'Product updated';
};

exports.deleteProduct = async (where) => {
  await this.findOneProduct(where);
  await Product.destroy({ where });

  return 'Product deleted';
};
