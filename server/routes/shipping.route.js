const express = require('express');
const orderController = require('../controllers/shipping.controller');
const auth = require('../middleware/auth');
const verifyToken = require('../middleware/verifyToken');
const orderRoute = express.Router();

orderRoute.route('/')
    .post(verifyToken, orderController.createOrder)
    .get(verifyToken, auth('admin'), orderController.getOrders)
orderRoute.route('/:email')
    .get(verifyToken, orderController.getOrderByEmail)
orderRoute.route('/:id')
    .patch(verifyToken, orderController.updateOrder)
    .delete(verifyToken, orderController.deleteOrder)

module.exports = orderRoute;