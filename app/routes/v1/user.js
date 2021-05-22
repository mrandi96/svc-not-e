const userController = require('../../controllers/user.controller');
const { authCheck } = require('../../helpers/middlewares/tokenHandler');

module.exports = (router) => {
  router.get('/', authCheck('admin'), userController.listAllUsers);
  router.post('/register/:userType', userController.registerUser);
  router.post('/login/:userType', userController.loginUser);
  router.get('/profile', authCheck(), userController.getUser);
  router.put('/profile', authCheck(), userController.updateUser);
  router.put('/change-password/:userType', userController.changePassword);
};
