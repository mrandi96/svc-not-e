const areaController = require('../../controllers/area.controller');

module.exports = (router) => {
  router.get('/country', areaController.getAllCountries);
  router.get('/country/:id', areaController.getAllCountries);
  router.get('/province', areaController.getAllCountries);
  router.get('/province/:id', areaController.getAllCountries);
  router.get('/district', areaController.getAllCountries);
  router.get('/district/:id', areaController.getAllCountries);
};
