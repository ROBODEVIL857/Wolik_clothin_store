const express = require('express');
const categoryController = require('../controllers/category.controller');
const auth = require('../middleware/auth');
const verifyToken = require('../middleware/verifyToken');
const categoryRoute = express.Router();

categoryRoute.route('/')
    .post(verifyToken, auth('admin'), categoryController.createCategory)
    .get( categoryController.getCategories)
categoryRoute.route('/:id')
    .get(categoryController.getCategoryById)

module.exports = categoryRoute;