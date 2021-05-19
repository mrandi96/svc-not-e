const { User } = require('../models');
const bcrypt = require('../libs/bcrypt');
const STRING = require('../libs/constants/string');
const { NOT_FOUND, CONFLICT } = require('../libs/constants/httpStatus');
const { errorNotFound, errorConflict } = require('../helpers/errorHandler');

exports.createUser = async (data) => {
  await User.create(data);
  return STRING().SUCCESS.CREATE.USER;
};

exports.findAllUser = async (options) => {
  const query = await User.findAll({ ...options });
  return query;
};

exports.findOneUser = async (where, type = NOT_FOUND) => {
  const query = await User.findOne({ where });
  if (type === NOT_FOUND && !query) errorNotFound(STRING().ERROR.NOT_FOUND.USER);
  else if (type === CONFLICT && query) errorConflict(STRING().ERROR.CONFLICT.USER);

  return query;
};

exports.updateUser = async (data, where, conflictWhere) => {
  await this.findOneUser(where);
  await this.findOneUser(conflictWhere, CONFLICT);
  await User.update(data, { where });

  return STRING().SUCCESS.UPDATE.USER;
};

exports.deleteUser = async (options) => {
  await User.destroy({ ...options });
  return STRING().SUCCESS.DELETE.USER;
};

exports.changeUserPassword = async (newPassword, where) => {
  const password = await bcrypt.hash(newPassword);
  await User.update({ password }, where);

  return STRING().SUCCESS.UPDATE.PASSWORD;
};
