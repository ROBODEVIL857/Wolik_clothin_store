const Blog = require("../models/Blog");

exports.createBlogServices = async (data) => {
    const result = await Blog.create(data);
    return result;
}
exports.getBlogServices = async () => {
    const result = await Blog.find({});
    const count = await Blog.count();
    return {count, result};
}
exports.getBlogServicesById = async (id) => {
    const result = await Blog.findOne({_id: id});
    return result;
}
exports.updateBlogServices = async (id, data) => {
    const result = await Blog.updateOne({ _id: id }, { $set: data }, {
        runValidators: true
    });
    return result;
}
exports.deleteBlogServices = async (id) => {
    const result = await Blog.deleteOne({ _id: id });
    return result;
}
