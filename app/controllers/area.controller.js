const responseBuilder = require('../helpers/responseBuilder');
const areaAction = require('../actions/area.action');

exports.getAllCountries = async (req, res) => {
  try {
    const data = await areaAction.findAllCountries(req.query);

    return responseBuilder(res, data);
  } catch (e) {
    return responseBuilder(res, e);
  }
};

exports.getOneCountry = async (req, res) => {
  try {
    const data = await areaAction.findOneCountry(req.params);

    return responseBuilder(res, data);
  } catch (e) {
    return responseBuilder(res, e);
  }
};

exports.getAllProvinces = async (req, res) => {
  try {
    const data = await areaAction.findAllProvinces(req.query);

    return responseBuilder(res, data);
  } catch (e) {
    return responseBuilder(res, e);
  }
};

exports.getOneProvince = async (req, res) => {
  try {
    const data = await areaAction.findOneProvince(req.params);

    return responseBuilder(res, data);
  } catch (e) {
    return responseBuilder(res, e);
  }
};

exports.getAllRegencies = async (req, res) => {
  try {
    const data = await areaAction.findAllRegencies(req.query);

    return responseBuilder(res, data);
  } catch (e) {
    return responseBuilder(res, e);
  }
};

exports.getOneRegency = async (req, res) => {
  try {
    const data = await areaAction.findOneRegency(req.params);

    return responseBuilder(res, data);
  } catch (e) {
    return responseBuilder(res, e);
  }
};
