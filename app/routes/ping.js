const responseBuilder = require('../helpers/responseBuilder');

module.exports = (router) => {
  router.get('/', (_, res) => responseBuilder(res, 'PONG'));
};
