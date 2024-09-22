const paymentController = require("../controllers/payment.controller");
const express = require('express');
const verifyToken = require("../middleware/verifyToken");
const paymentRoute = express.Router();

paymentRoute.route('/create-payment-intent')
    .post(verifyToken, paymentController.createPayment)
paymentRoute.route('/')
    .post(verifyToken, paymentController.postPayment)
    .get(verifyToken, paymentController.getPayment)

module.exports = paymentRoute;