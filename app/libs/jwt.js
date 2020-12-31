const jwt = require('jsonwebtoken');
const config = require('../../config');

const secretKey = config.JWT_SECRET_KEY;
const expiresIn = config.JWT_EXPIRE_TIME;

exports.sign = (payload) => jwt.sign(payload, secretKey, { expiresIn });

exports.verify = (token) => jwt.verify(token, secretKey, (e, decoded) => {
  if (e) return e;
  return decoded;
});

exports.decode = (token) => jwt.decode(token, { json: true });
