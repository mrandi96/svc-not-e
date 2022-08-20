const { CONFLICT, NOT_FOUND } = require('../libs/constants/httpStatus');
const { Product } = require('../models');
const STRING = require('../libs/constants/string');
const { errorConflict, errorNotFound } = require('../helpers/errorHandler');

exports.createProduct = async (data, where) => {
  await this.findOneProduct(where, CONFLICT);
  const response = await Product.create(data);

  return response;
};

exports.findAllProducts = async (where) => {
  const query = await Product.findAll({ where });

  return query;
};

exports.findOneProduct = async (where, type = NOT_FOUND) => {
  const query = await Product.findOne({ where });
  if (query && type === CONFLICT) {
    errorConflict(STRING().ERROR.CONFLICT.PRODUCT);
  } else if (!query && type === NOT_FOUND) {
    errorNotFound(STRING().ERROR.NOT_FOUND.PRODUCT);
  }

  return query;
};

exports.updateProduct = async (data, where, conflictWhere) => {
  await this.findOneProduct(where);
  await this.findOneProduct(conflictWhere, CONFLICT);
  await Product.update(data, { where });

  return STRING().SUCCESS.UPDATE.PRODUCT;
};

exports.deleteProduct = async (where) => {
  await this.findOneProduct(where);
  await Product.destroy({ where });

  return STRING().SUCCESS.DELETE.PRODUCT;
};
