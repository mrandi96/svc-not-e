const {
  Country,
  Province,
  Regency
} = require('../models');
const STRING = require('../libs/constants/string');
const { errorNotFound } = require('../helpers/errorHandler');

exports.findAllCountries = async (where) => {
  const query = await Country.findAll({ where });
  return query;
};

exports.findOneCountry = async (where) => {
  const query = await Country.findOne({ where });
  if (!query) errorNotFound(STRING().ERROR.NOT_FOUND.COUNTRY);

  return query;
};

exports.findAllProvinces = async (where) => {
  const query = await Province.findAll({ where });
  return query;
};

exports.findOneProvince = async (where) => {
  const query = await Province.findOne({ where });
  if (!query) errorNotFound(STRING().ERROR.NOT_FOUND.PROVINCE);

  return query;
};

exports.findAllRegencies = async (where) => {
  const query = await Regency.findAll({ where });
  return query;
};

exports.findOneRegency = async (where) => {
  const query = await Regency.findOne({ where });
  if (!query) errorNotFound(STRING().ERROR.NOT_FOUND.REGENCY);

  return query;
};

exports.checkAreaExist = async (countryId, provinceId, regencyId) => {
  await this.findOneCountry({ countryId });
  await this.findOneProvince({ provinceId, countryId });
  await this.findOneRegency({ regencyId, provinceId });
};
