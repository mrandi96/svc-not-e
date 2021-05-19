const responseBuilder = require('../responseBuilder');
const shopAction = require('../../actions/shop.action');
const { UNAUTHORIZED } = require('../../libs/constants/httpStatus');
const STRING = require('../../libs/constants/string');

module.exports = async (req, res, next) => {
  const { userId } = req.user;
  const { shopId } = req.params;
  const isShopOwner = await shopAction.checkShopOwner(shopId, userId);

  if (!isShopOwner) {
    const e = new Error(STRING().ERROR.UNAUTHORIZED.SHOP);
    e.status = UNAUTHORIZED;
    return responseBuilder(res, e);
  }

  return next();
};
