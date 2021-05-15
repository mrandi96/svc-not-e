const areaController = require('../../controllers/area.controller');

module.exports = (router) => {
  router.get('/country', areaController.getAllCountries);
  router.get('/country/:countryId', areaController.getOneCountry);
  router.get('/province', areaController.getAllProvinces);
  router.get('/province/:provinceId', areaController.getOneProvince);
  router.get('/district', areaController.getAllDistrict);
  router.get('/district/:districtId', areaController.getOneDistrict);
};
