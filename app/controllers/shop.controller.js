const shopAction = require('../actions/shop.action');
const httpStatus = require('../libs/constants/httpStatus');
const responseBuilder = require('../helpers/responseBuilder');

exports.registerShop = async (req, res) => {
  try {
    const { userId } = req.user;
    const payload = { ...req.body, ownerId: userId };

    const message = await shopAction.createShop(payload);

    return responseBuilder(res, message, true);
  } catch (e) {
    return responseBuilder(res, e);
  }
};

exports.findOwnerShops = async (req, res) => {
  try {
    const { userId: ownerId } = req.user;
    const data = await shopAction.findAllShops({ where: { ownerId } });

    return responseBuilder(res, data);
  } catch (e) {
    return responseBuilder(res, e);
  }
};

exports.updateShop = async (req, res) => {
  try {
    const { userId: ownerId } = req.user;
    const { shopId } = req.params;
    const where = { ownerId, shopId };
    const payload = { ...req.body, ownerId };
    const message = await shopAction.updateShop(payload, where);

    return responseBuilder(res, message);
  } catch (e) {
    return responseBuilder(res, e);
  }
};

exports.deleteShop = async (req, res) => {
  try {
    const { userId: ownerId } = req.user;
    const { shopId } = req.params;
    const where = { ownerId, shopId };
    const message = await shopAction.deleteShop(where);

    return responseBuilder(res, message);
  } catch (e) {
    return responseBuilder(res, e);
  }
};

exports.ownerShopDetail = async (req, res) => {
  try {
    const { userId: ownerId } = req.user;
    const { shopId } = req.params;

    const data = await shopAction.findOneShop({ ownerId, shopId });
    if (!data) return responseBuilder(res, 'Shop not found', httpStatus.NOT_FOUND);

    return responseBuilder(res, data);
  } catch (e) {
    return responseBuilder(res, e);
  }
};
