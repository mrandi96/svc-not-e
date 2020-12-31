const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');
const { compare } = require('../libs/bcrypt');

const User = sequelize.define('User', {
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  contactNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userType: {
    type: DataTypes.ENUM('owner', 'customer')
  }
}, {
  tableName: 'user',
  timestamps: true,
  paranoid: true
});

User.prototype.isValid = async function isValid(password) {
  const checkValid = await compare(password, this.password);
  return checkValid;
};

module.exports = User;