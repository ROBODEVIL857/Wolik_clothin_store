const Category = require("../models/Category");

exports.createCategoryServices = async (data) => {
    const result = await Category.create(data);
    return result;
}
exports.getCategoryServices = async () => {
    const result = await Category.find({});
    const count = await Category.count();
    return {count, result};
}
exports.getCategoryServicesById = async (id) => {
    const result = await Category.findOne({_id: id});
    return result;
}
