const jwt = require('../libs/jwt');
const bcrypt = require('../libs/bcrypt');
const userAction = require('../actions/user.action');
const httpStatus = require('../libs/constants/httpStatus');
const responseBuilder = require('../helpers/responseBuilder');

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
    let { body } = req;
    const { email, password } = req.body;
    const userExist = await userAction.findOneUser({ where: { email } });
    if (userExist) {
      return responseBuilder(res, 'email already registered', httpStatus.CONFLICT);
    }
    body = {
      ...body,
      userType,
      password: await bcrypt.hash(password)
    };
    const message = await userAction.createUser(body);

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
      return responseBuilder(res, 'user not registered', httpStatus.NOT_FOUND);
    }
    const isValid = await user.isValid(password);
    if (!isValid) {
      return responseBuilder(res, 'email/password is invalid', httpStatus.UNAUTHORIZED);
    }

    const { userId, fullName, contactNumber } = user;

    const token = jwt.sign({ userId, fullName, contactNumber });

    return responseBuilder(res, { token });
  } catch (e) {
    return responseBuilder(res, e);
  }
};
