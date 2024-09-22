const Product = require("../models/Product");

exports.getProductServices = async (filters, queries) => {
    const result = await Product.find(filters).populate('reviews')
        .sort(queries.sort)
        .select(queries.fields)
        .skip(queries.skip)
        .limit(queries.limit)
        
    // const result = await Product.find({ brand: { $in: ['Style Echo', 'Jens'] }})
        
    const count = await Product.countDocuments(filters)
    return { count, result };
}
exports.createProductServices = async (data) => {
    const result = await Product.create(data);
    return result;
}
exports.getProductServicesById = async (id) => {
    const updateProduct = await Product.updateOne( { _id: id }, { $inc: { views: 1 }} )
    const result = await Product.findOne({_id: id}).populate('reviews');
    return result;
}
exports.updateProductServices = async (id, data) => {
    const result = await Product.updateOne({ _id: id }, { $set: data }, {
        runValidators: true
    });
    return result;
}
exports.deleteProductServices = async (id) => {
    const result = await Product.deleteOne({ _id: id });
    return result;
}

exports.getTrendingProductsServices = async () => {
    const tour = await Product.find().populate('reviews')
        .sort({ views: -1 })
        .limit(8)
    return tour;
}