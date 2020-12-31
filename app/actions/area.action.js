const {
  Country,
  Province,
  District
} = require('../models');

exports.findAllCountries = async (options) => {
  const query = await Country.findAll({ ...options });
  return query;
};

exports.findOneCountry = async (options) => {
  const query = await Country.findOne({ ...options });
  return query;
};

exports.findAllProvinces = async (options) => {
  const query = await Province.findAll({ ...options });
  return query;
};

exports.findOneProvince = async (options) => {
  const query = await Province.findOne({ ...options });
  return query;
};

exports.findAllDistricts = async (options) => {
  const query = await District.findAll({ ...options });
  return query;
};

exports.findOneDistrict = async (options) => {
  const query = await District.findOne({ ...options });
  return query;
};
