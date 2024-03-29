const jwt = require('../libs/jwt');
const bcrypt = require('../libs/bcrypt');
const userAction = require('../actions/user.action');
const httpStatus = require('../libs/constants/httpStatus');
const responseBuilder = require('../helpers/responseBuilder');
const { CONFLICT } = require('../libs/constants/httpStatus');
const STRING = require('../libs/constants/string');
const { errorUnauthorized, errorForbidden } = require('../helpers/errorHandler');

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
    if (userType === 'admin') errorForbidden();
    const { email, password } = req.body;
    await userAction.findOneUser({ email, userType }, CONFLICT);
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
    const user = await userAction.findOneUser({ email, userType });
    const isValid = await user.isValid(password);
    if (!isValid) errorUnauthorized(STRING().ERROR.UNAUTHORIZED.USER);

    const {
      userId, userType: type
    } = user;

    const token = jwt.sign({
      userId,
      userType: type
    });

    return responseBuilder(res, { token });
  } catch (e) {
    return responseBuilder(res, e);
  }
};

exports.getUser = async (req, res) => {
  try {
    const { userId } = req.user;
    const {
      email,
      fullName,
      contactNumber,
      address,
      userType,
      createdAt
    } = await userAction.findOneUser({ userId });

    return responseBuilder(res, {
      email,
      fullName,
      contactNumber,
      address,
      userType,
      createdAt
    });
  } catch (e) {
    return responseBuilder(res, e);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { userId } = req.user;
    const { fullName, contactNumber, address } = req.body;
    const message = await userAction
      .updateUser({ fullName, contactNumber, address }, { userId }, false);

    return responseBuilder(res, message);
  } catch (e) {
    return responseBuilder(res, e);
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { userType } = req.params;
    const { email, password, newPassword } = req.body;
    const user = await userAction.findOneUser({ email, userType });
    const isValid = await user.isValid(password);
    if (!isValid) errorUnauthorized(STRING().ERROR.UNAUTHORIZED.USER);

    const message = await userAction.changeUserPassword(newPassword, { email, userType });

    return responseBuilder(res, message);
  } catch (e) {
    return responseBuilder(res, e);
  }
};
