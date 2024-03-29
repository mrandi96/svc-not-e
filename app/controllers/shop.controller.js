const shopAction = require('../actions/shop.action');
const responseBuilder = require('../helpers/responseBuilder');

exports.registerShop = async (req, res) => {
  try {
    const { userId } = req.user;
    const payload = { ...req.body, ownerId: userId };

    const data = await shopAction.createShop(payload);

    return responseBuilder(res, data, true);
  } catch (e) {
    return responseBuilder(res, e);
  }
};

exports.findOwnerShops = async (req, res) => {
  try {
    const { userId: ownerId } = req.user;
    const data = await shopAction.findAllShops({ ownerId });

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
    const message = await shopAction.deleteShop({ ownerId, shopId });

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

    return responseBuilder(res, data);
  } catch (e) {
    return responseBuilder(res, e);
  }
};
