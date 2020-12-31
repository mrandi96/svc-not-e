const { User } = require('../models');

exports.createUser = async (data) => {
  await User.create(data);
  return 'user created';
};

exports.findAllUser = async (options) => {
  const query = await User.findAll({ ...options });
  return query;
};

exports.findOneUser = async (options) => {
  const query = await User.findOne({ ...options });
  return query;
};

exports.updateUser = async (data, options) => {
  await User.update(data, { ...options });
  return 'user updated';
};

exports.deleteUser = async (options) => {
  await User.destroy({ ...options });
  return 'user deleted';
};
