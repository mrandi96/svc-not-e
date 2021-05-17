const { verify } = require('../libs/jwt');
const responseBuilder = require('./responseBuilder');
const { isError } = require('./common');
const { UNAUTHORIZED } = require('../libs/constants/httpStatus');

const getBearerToken = async (req) => {
  const authorization = req.headers.authorization || '';
  const [bearer, token] = authorization.split(' ');
  if (bearer === 'Bearer') return token;
  return null;
};

exports.authCheck = async (req, res, next) => {
  try {
    const token = await getBearerToken(req);
    const decoded = verify(token);
    if (isError(decoded)) {
      const e = new Error(decoded.message);
      e.status = UNAUTHORIZED;
      throw e;
    }
    req.user = decoded;
    return next();
  } catch (e) {
    return responseBuilder(res, e);
  }
};
