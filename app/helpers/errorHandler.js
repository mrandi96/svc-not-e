const {
  NOT_FOUND,
  CONFLICT,
  UNAUTHORIZED,
  BAD_REQUEST,
  FORBIDDEN
} = require('../libs/constants/httpStatus');

exports.errorNotFound = (message) => {
  const e = new Error(message);
  e.status = NOT_FOUND;
  throw e;
};

exports.errorConflict = (message) => {
  const e = new Error(message);
  e.status = CONFLICT;
  throw e;
};

exports.errorUnauthorized = (message) => {
  const e = new Error(message);
  e.status = UNAUTHORIZED;
  throw e;
};

exports.erorrForbidden = (message) => {
  const e = new Error(message);
  e.status = FORBIDDEN;
  throw e;
};

exports.errorBadRequest = (message) => {
  const e = new Error(message);
  e.status = BAD_REQUEST;
  throw e;
};
