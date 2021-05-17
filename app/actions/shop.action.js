const { Shop } = require('../models');
const { checkAreaExist } = require('./area.action');
const { NOT_FOUND, CONFLICT } = require('../libs/constants/httpStatus');

exports.createShop = async (data) => {
  const {
    countryId, provinceId, regencyId,
    ownerId, shopName
  } = data;
  await checkAreaExist(countryId, provinceId, regencyId);
  await this.findOneShop({ ownerId, shopName }, CONFLICT);

  await Shop.create(data);
  return 'Shop created';
};

exports.findAllShops = async (options) => {
  const query = await Shop.findAll({ ...options });
  return query;
};

exports.findOneShop = async (where, type = NOT_FOUND) => {
  const query = await Shop.findOne({ where });
  if (!query && type === NOT_FOUND) {
    const e = new Error('Shop not found');
    e.status = NOT_FOUND;
    throw e;
  } else if (query && type === CONFLICT) {
    const e = new Error('Shop already exist');
    e.status = CONFLICT;
    throw e;
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

  return 'Shop updated';
};

exports.deleteShop = async (where) => {
  await this.findOneShop(where);

  await Shop.destroy({ where });
  return 'Shop deleted';
};

exports.checkShopOwner = async (shopId, ownerId) => {
  const query = await Shop.findOne({ where: { shopId, ownerId } });
  if (query) return true;
  return false;
};
