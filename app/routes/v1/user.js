const userController = require('../../controllers/user.controller');
const { authCheck } = require('../../helpers/tokenHandler');

module.exports = (router) => {
  router.get('/', userController.listAllUsers);
  router.post('/register/:userType', userController.registerUser);
  router.post('/login/:userType', userController.loginUser);
  router.put('/profile', authCheck, userController.updateUser);
  router.put('/change-password/:userType', userController.changePassword);
};
