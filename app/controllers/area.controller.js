const responseBuilder = require('../helpers/responseBuilder');
const areaAction = require('../actions/area.action');

exports.getAllCountries = async (eq, res) => {
  try {
    const data = await areaAction.findAllCountries();

    return responseBuilder(res, data);
  } catch (e) {
    return responseBuilder(res, e);
  }
};

exports.getOneCountry = async (req, res) => {
  try {
    const data = await areaAction.findOneCountry();

    return responseBuilder(res, data);
  } catch (e) {
    return responseBuilder(res, e);
  }
};

exports.getAllProvinces = async (req, res) => {
  try {
    const data = await areaAction.findAllProvinces();

    return responseBuilder(res, data);
  } catch (e) {
    return responseBuilder(res, e);
  }
};

exports.getOneProvince = async (req, res) => {
  try {
    const data = await areaAction.findOneProvince();

    return responseBuilder(res, data);
  } catch (e) {
    return responseBuilder(res, e);
  }
};

exports.getAllDistrict = async (req, res) => {
  try {
    const data = await areaAction.findAllDistricts();

    return responseBuilder(res, data);
  } catch (e) {
    return responseBuilder(res, e);
  }
};

exports.getOneDistrict = async (req, res) => {
  try {
    const data = await areaAction.findOneDistrict();

    return responseBuilder(res, data);
  } catch (e) {
    return responseBuilder(res, e);
  }
};
