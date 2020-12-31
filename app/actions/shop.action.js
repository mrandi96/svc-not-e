const { Shop } = require('../models');

exports.createShop = async (data) => {
  await Shop.create(data);
  return 'shop created';
};

exports.findAllShops = async (options) => {
  const query = await Shop.findAll({ ...options });
  return query;
};

exports.findOneShop = async (options) => {
  const query = await Shop.findOne({ ...options });
  return query;
};

exports.updateShop = async (data, options) => {
  await Shop.update(data, { ...options });
  return 'shop updated';
};

exports.deleteShop = async (options) => {
  await Shop.destroy({ ...options });
  return 'shop deleted';
};

exports.checkShopOwner = async (shopId, ownerId) => {
  const query = await Shop.findOne({ where: { shopId, ownerId } });
  if (query) return true;
  return false;
};
