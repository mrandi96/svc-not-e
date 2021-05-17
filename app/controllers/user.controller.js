const jwt = require('../libs/jwt');
const bcrypt = require('../libs/bcrypt');
const userAction = require('../actions/user.action');
const httpStatus = require('../libs/constants/httpStatus');
const responseBuilder = require('../helpers/responseBuilder');
const { UNAUTHORIZED, NOT_FOUND, CONFLICT } = require('../libs/constants/httpStatus');

exports.listAllUsers = async (req, res) => {
  try {
    const data = await userAction.findAllUser();
    return responseBuilder(res, data);
  } catch (e) {
    return responseBuilder(res, e);
  }
};

exports.registerUser = async (req, res) => {
  try {
    const { userType } = req.params;
    const { email, password } = req.payload;
    const userExist = await userAction.findOneUser({ where: { email } });
    if (userExist) {
      const e = new Error('User already registered');
      e.status = CONFLICT;
      throw e;
    }
    const payload = {
      ...req.body,
      userType,
      password: await bcrypt.hash(password)
    };
    const message = await userAction.createUser(payload);

    return responseBuilder(res, message, httpStatus.CREATED);
  } catch (e) {
    return responseBuilder(res, e);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { userType } = req.params;
    const { email, password } = req.body;
    const user = await userAction.findOneUser({ where: { email, userType } });
    if (!user) {
      const e = new Error('User not registered');
      e.status = NOT_FOUND;
      throw e;
    }
    const isValid = await user.isValid(password);
    if (!isValid) {
      const e = new Error('Email/password is invalid');
      e.status = UNAUTHORIZED;
      throw e;
    }

    const { userId, fullName, contactNumber } = user;

    const token = jwt.sign({ userId, fullName, contactNumber });

    return responseBuilder(res, { token });
  } catch (e) {
    return responseBuilder(res, e);
  }
};
