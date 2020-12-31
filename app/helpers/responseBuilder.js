const httpStatus = require('../libs/constants/httpStatus');
const { isError } = require('./common');

module.exports = (res, value, status = httpStatus.OK) => {
  const timestamp = new Date().toISOString();
  const response = {
    timestamp,
    status
  };
  if (isError(value)) {
    response.status = httpStatus.INTERNAL_SERVER_ERROR;
    response.error = value.message;
  } else if (typeof value === 'object') {
    response.data = value;
  } else {
    response.message = value;
  }
  return res.status(status).json(response);
};
