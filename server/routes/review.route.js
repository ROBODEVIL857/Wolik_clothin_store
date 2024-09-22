const express = require('express');
const reviewController = require('../controllers/review.controller');
const verifyToken = require('../middleware/verifyToken');
const reviewRoute = express.Router();

reviewRoute.route('/')
    .post(verifyToken, reviewController.createReview)
    .get(reviewController.getReviews)
reviewRoute.route('/:id')
    .get(reviewController.getReviewById)
reviewRoute.route('/product/:productId')
    .get(reviewController.getReviewByProductId)

module.exports = reviewRoute;