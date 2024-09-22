const express = require('express');
const userController = require('../controllers/user.controller');
const auth = require('../middleware/auth');
const verifyToken = require('../middleware/verifyToken');
const userRoute = express.Router();

userRoute.get('/', verifyToken, auth('admin'), userController.getUsers)
userRoute.post('/signup', userController.signup)
userRoute.post('/login', userController.login)
userRoute.patch('/update/:id', verifyToken, userController.updateUserById)

userRoute.get('/me/recomendations', verifyToken, userController.getRecomendations)
userRoute.get('/me', verifyToken, userController.getMe)
userRoute.patch('/me', verifyToken, userController.updateUser)
userRoute.patch('/me/:productId', verifyToken, userController.updateProduct)

// /users/me/recomendations

module.exports = userRoute;