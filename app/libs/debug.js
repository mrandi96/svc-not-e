/* eslint-disable no-console */
const { DEBUG_MODE = false } = require('../../config');
const { isError } = require('../helpers/common');

module.exports = (message) => {
  if (DEBUG_MODE) {
    if (['all', 'error'].includes(DEBUG_MODE) && isError(message)) return console.error(message);
    if (['all', 'log'].includes(DEBUG_MODE)) return console.log(message);
  }

  return undefined;
};
