const shopAction = require('../actions/shop.action');
const httpStatus = require('../libs/constants/httpStatus');
const responseBuilder = require('../helpers/responseBuilder');

exports.registerShop = async (req, res) => {
  try {
    const { userId } = req.user;
    const body = { ...req.body, ownerId: userId };

    const message = await shopAction.createShop(body);

    return responseBuilder(res, message, httpStatus.CREATED);
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

exports.ownerShopDetail = async (req, res) => {
  try {
    const { userId: ownerId } = req.user;
    const { shopId } = req.params;

    const data = await shopAction.findOneShop({ where: { ownerId, shopId } });
    if (!data) return responseBuilder(res, 'shop not found', httpStatus.NOT_FOUND);

    return responseBuilder(res, data);
  } catch (e) {
    return responseBuilder(res, e);
  }
};
