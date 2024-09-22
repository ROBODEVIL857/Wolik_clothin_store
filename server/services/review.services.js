const Product = require("../models/Product");
const Review = require("../models/Review");

exports.createReviewServices = async (data) => {
    const result = await Review.create(data);
    const { _id: reviewId, productId } = result;
    const insertProduct = await Product.updateOne(
        { _id: productId},
        { $push: { reviews: reviewId } }
        )
    return result;
}
exports.getReviewServices = async () => {
    const result = await Review.find({});
    const count = await Review.count();
    return {count, result};
}
exports.getReviewServicesById = async (id) => {
    const result = await Review.findOne({_id: id});
    return result;
}
exports.getReviewServicesByProductId = async (id) => {
    const result = await Review.find({ productId: id });
    return result;
}
