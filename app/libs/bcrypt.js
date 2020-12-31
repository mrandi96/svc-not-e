const bcrypt = require('bcryptjs');
const config = require('../../config');

const salt = async () => {
  const genSalt = await bcrypt.genSalt(config.SALT_ROUND);
  return genSalt;
};

exports.hash = async (string) => {
  const hashed = await bcrypt.hash(string, await salt());
  return hashed;
};

exports.compare = async (password, hash) => {
  const isValid = await bcrypt.compare(password, hash);
  return isValid;
};
