const { Shop } = require('../models');
const { checkAreaExist } = require('./area.action');
const { NOT_FOUND, CONFLICT } = require('../libs/constants/httpStatus');
const STRING = require('../libs/constants/string');
const { errorNotFound, errorConflict } = require('../helpers/errorHandler');

exports.createShop = async (data) => {
  const {
    countryId, provinceId, regencyId,
    ownerId, shopName
  } = data;
  await checkAreaExist(countryId, provinceId, regencyId);
  await this.findOneShop({ ownerId, shopName }, CONFLICT);
  await Shop.create(data);

  return STRING().SUCCESS.CREATE.SHOP;
};

exports.findAllShops = async (where) => {
  const query = await Shop.findAll({
    where,
    include: ['Country', 'Province', 'Regency']
  });
  return query;
};

exports.findOneShop = async (where, type = NOT_FOUND) => {
  const query = await Shop.findOne({
    where,
    include: ['Country', 'Province', 'Regency']
  });
  if (!query && type === NOT_FOUND) {
    errorNotFound(STRING().ERROR.NOT_FOUND.SHOP);
  } else if (query && type === CONFLICT) {
    errorConflict(STRING().ERROR.CONFLICT.SHOP);
  }

  return query;
};

exports.updateShop = async (data, where) => {
  const {
    countryId, provinceId, regencyId,
    ownerId, shopName
  } = data;

  const { shopName: currentShop } = await this.findOneShop(where);
  if (currentShop !== shopName) await this.findOneShop({ ownerId, shopName }, CONFLICT);

  await checkAreaExist(countryId, provinceId, regencyId);
  await Shop.update(data, { where });

  return STRING().SUCCESS.UPDATE.SHOP;
};

exports.deleteShop = async (where) => {
  await this.findOneShop(where);

  await Shop.destroy({ where });
  return STRING().SUCCESS.DELETE.SHOP;
};

exports.checkShopOwner = async (shopId, ownerId) => {
  const query = await Shop.findOne({ where: { shopId, ownerId } });
  if (query) return true;
  return false;
};
