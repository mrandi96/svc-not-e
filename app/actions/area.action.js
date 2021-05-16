const {
  Country,
  Province,
  District
} = require('../models');
const { NOT_FOUND } = require('../libs/constants/httpStatus');

exports.findAllCountries = async (where) => {
  const query = await Country.findAll({ where });
  return query;
};

exports.findOneCountry = async (where) => {
  const query = await Country.findOne({ where });

  if (!query) {
    const e = new Error('Country not found');
    e.status = NOT_FOUND;
    throw e;
  }
  return query;
};

exports.findAllProvinces = async (where) => {
  const query = await Province.findAll({ where });
  return query;
};

exports.findOneProvince = async (where) => {
  const query = await Province.findOne({ where });
  if (!query) {
    const e = new Error('Province not found');
    e.status = NOT_FOUND;
    throw e;
  }

  return query;
};

exports.findAllDistricts = async (where) => {
  const query = await District.findAll({ where });
  return query;
};

exports.findOneDistrict = async (where) => {
  const query = await District.findOne({ where });
  if (!query) {
    const e = new Error('District not found');
    e.status = NOT_FOUND;
    throw e;
  }

  return query;
};
