const {
  Country,
  Province,
  Regency
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

exports.findAllRegencies = async (where) => {
  const query = await Regency.findAll({ where });
  return query;
};

exports.findOneRegency = async (where) => {
  const query = await Regency.findOne({ where });
  if (!query) {
    const e = new Error('Regency not found');
    e.status = NOT_FOUND;
    throw e;
  }

  return query;
};

exports.checkAreaExist = async (countryId, provinceId, regencyId) => {
  await this.findOneCountry({ countryId });
  await this.findOneProvince({ provinceId, countryId });
  await this.findOneRegency({ regencyId, provinceId });
};
