const mongoose = require('mongoose');
const validator = require('validator');
const { ObjectId } = mongoose.Schema.Types;

const reviewSchema = mongoose.Schema({
    rating: {
        type: Number,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    review: {
        type: String
    },
    postedBy: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
    },
    productId: {
        type: ObjectId,
        ref: "Product",
        required: true
    }
}, {
    timestamps: true
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;