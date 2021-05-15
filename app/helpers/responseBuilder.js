const httpStatus = require('../libs/constants/httpStatus');
const { isError } = require('./common');
const debug = require('../libs/debug');

module.exports = (res, value, isPost = false) => {
  let status = httpStatus.OK;
  if (isPost) status = httpStatus.CREATED;
  const response = {
    timestamp: new Date().toISOString(),
    error: false,
    status
  };

  if (isError(value)) {
    status = value.status || httpStatus.INTERNAL_SERVER_ERROR;
    response.status = status;
    response.error = true;
    response.message = value.message;
  } else if (typeof value === 'object') {
    response.data = value;
  } else {
    response.message = value;
  }

  debug(value);
  return res.status(status).json(response);
};
