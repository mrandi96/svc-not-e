const userController = require('../../controllers/user.controller');

module.exports = (router) => {
  router.get('/', userController.listAllUsers);
  router.post('/register/:userType', userController.registerUser);
  router.post('/login/:userType', userController.loginUser);
};
