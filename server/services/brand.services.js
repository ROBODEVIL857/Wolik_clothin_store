const Brand = require("../models/Brand")

exports.createBrandServices = async (data) => {
    const result = await Brand.create(data);
    return result;
}
exports.getBrandServices = async () => {
    const result = await Brand.find({});
    const count = await Brand.count();
    return {count, result};
}
exports.getBrandServicesById = async (id) => {
    const result = await Brand.findOne({_id: id});
    return result;
}
