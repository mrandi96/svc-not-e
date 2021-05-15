const {
  Country,
  Province,
  District
} = require('../models');

exports.findAllCountries = async (where) => {
  const query = await Country.findAll({ where });
  return query;
};

exports.findOneCountry = async (where) => {
  const query = await Country.findOne({ where });
  return query;
};

exports.findAllProvinces = async (where) => {
  const query = await Province.findAll({ where });
  return query;
};

exports.findOneProvince = async (where) => {
  const query = await Province.findOne({ where });
  return query;
};

exports.findAllDistricts = async (where) => {
  const query = await District.findAll({ where });
  return query;
};

exports.findOneDistrict = async (where) => {
  const query = await District.findOne({ where });
  return query;
};
