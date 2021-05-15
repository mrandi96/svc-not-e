const { Sequelize } = require('sequelize');
const config = require('../../config');
const debug = require('../libs/debug');

const params = {
  logging: debug,
  dialect: 'postgres',
  operatorsAliases: 0,
  dialectOptions: {
    ssl: { rejectUnauthorized: false }
  },
  pool: {
    handleDisconnects: true,
    max: 20,
    min: 0,
    idle: 10000,
    acquire: 20000
  },
  define: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    underscored: true,
    timestamps: false,
    paranoid: false
  }
};

module.exports = new Sequelize(config.DB, params);
