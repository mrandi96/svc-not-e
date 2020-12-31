const responseBuilder = require('../responseBuilder');
const shopAction = require('../../actions/shop.action');
const httpStatus = require('../../libs/constants/httpStatus');

module.exports = async (req, res, next) => {
  const { userId } = req.user;
  const { shopId } = req.params;
  const isShopOwner = await shopAction.checkShopOwner(shopId, userId);

  if (!isShopOwner) return responseBuilder(res, 'you do not have access to this shop', httpStatus.UNAUTHORIZED);

  return next();
};
