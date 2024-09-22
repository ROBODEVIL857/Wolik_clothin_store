const express = require('express');
const brandController = require('../controllers/brand.controller');
const auth = require('../middleware/auth');
const verifyToken = require('../middleware/verifyToken');
const brandRoute = express.Router();

brandRoute.route('/')
    .post(verifyToken, auth('admin'), brandController.createBrand)
    .get(brandController.getBrands)
brandRoute.route('/:id')
    .get(brandController.getBrandById)

module.exports = brandRoute;