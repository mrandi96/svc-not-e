const {
  NOT_FOUND,
  CONFLICT,
  UNAUTHORIZED,
  BAD_REQUEST,
  FORBIDDEN
} = require('../libs/constants/httpStatus');

exports.errorNotFound = (message = 'Not Found') => {
  const e = new Error(message);
  e.status = NOT_FOUND;
  throw e;
};

exports.errorConflict = (message = 'Conflict') => {
  const e = new Error(message);
  e.status = CONFLICT;
  throw e;
};

exports.errorUnauthorized = (message = 'Unauthorized') => {
  const e = new Error(message);
  e.status = UNAUTHORIZED;
  throw e;
};

exports.erorrForbidden = (message = 'Restricted Access') => {
  const e = new Error(message);
  e.status = FORBIDDEN;
  throw e;
};

exports.errorBadRequest = (message = 'Bad Request') => {
  const e = new Error(message);
  e.status = BAD_REQUEST;
  throw e;
};
