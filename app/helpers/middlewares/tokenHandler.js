const { verify } = require('../../libs/jwt');
const responseBuilder = require('../responseBuilder');
const { isError } = require('../common');
const { errorUnauthorized, erorrForbidden } = require('../errorHandler');

const getBearerToken = async (req) => {
  const authorization = req.headers.authorization || '';
  const [bearer, token] = authorization.split(' ');
  if (bearer === 'Bearer') return token;
  return null;
};

const handleUserFilterInput = (userFilter) => {
  if (typeof userFilter[0] === 'string' && userFilter[0].includes(',')) return userFilter[0].split(', ');
  if (Array.isArray(userFilter[0])) return userFilter[0];
  if (Array.isArray(userFilter)) return userFilter;
  throw new Error();
};

exports.authCheck = (...userFilter) => async (req, res, next) => {
  try {
    const token = await getBearerToken(req);
    const decoded = verify(token);
    const { userType } = decoded;
    if (isError(decoded)) errorUnauthorized(decoded.message);
    if (userFilter.length > 0 && !handleUserFilterInput(userFilter).includes(userType)) {
      erorrForbidden();
    }

    req.user = decoded;
    return next();
  } catch (e) {
    return responseBuilder(res, e);
  }
};
