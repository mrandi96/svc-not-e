const responseBuilder = require('../responseBuilder');
const shopAction = require('../../actions/shop.action');
const { UNAUTHORIZED } = require('../../libs/constants/httpStatus');

module.exports = async (req, res, next) => {
  const { userId } = req.user;
  const { shopId } = req.params;
  const isShopOwner = await shopAction.checkShopOwner(shopId, userId);

  if (!isShopOwner) {
    const e = new Error('You do not have access to this shop');
    e.status = UNAUTHORIZED;
    return responseBuilder(res, e);
  }

  return next();
};
