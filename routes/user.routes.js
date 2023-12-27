const route = require('express').Router();
const userController = require('../controller/user.controller');
const AuthUser = require('../middelware/authUser');


route.post('/signup', userController.signUp)

route.post("/login", userController.login);

route.get('/get-profile', AuthUser.isAuth, userController.getProfile);

route.get('/get-all-user', userController.getAllUser);

route.patch('/update-profile', userController.updateProfile);

route.delete('/logout', AuthUser.isAuth, userController.logout)

module.exports = route