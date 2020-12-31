const responseBuilder = require('../helpers/responseBuilder');

module.exports = (router) => {
  router.get('/', (req, res) => responseBuilder(res, 'PONG'));
};
