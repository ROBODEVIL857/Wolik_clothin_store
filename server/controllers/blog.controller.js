const { createBlogServices, getBlogServices, getBlogServicesById, deleteBlogServices, updateBlogServices } = require("../services/blog.services");

exports.createBlog = async(req, res, next) => {
    try {
        const result = await createBlogServices(req.body);
        res.status(200).send({
            status: 'success',
            message: "Blog created successfully",
            data: result
        })
    } catch (error) {
        res.status(400).send({
            status: 'fail',
            message: "Could not create the Blog",
            error: error.message
        })
    }
}
exports.getBlogs = async(req, res, next) => {
    try {
        const result = await getBlogServices();
        res.status(200).send({
            status: 'success',
            message: "Blogs get successfully",
            data: result
        })
    } catch (error) {
        res.status(400).send({
            status: 'fail',
            message: "Could not find any Blogs",
            error: error.message
        })
    }
}
exports.getBlogById = async(req, res, next) => {
    const { id } = req.params;
    try {
        const result = await getBlogServicesById(id);
        if(!result){
            return res.status(400).send({
                status: 'fail',
                message: "Could not find any Blog with this ID",
                error: error.message
            })
        }
        res.status(200).send({
            status: 'success',
            message: "Blog get successfully",
            data: result
        })
    } catch (error) {
        res.status(400).send({
            status: 'fail',
            message: "Could not find any Blogs",
            error: error.message
        })
    }
}
exports.updateBlog = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await updateBlogServices(id, req.body);

        res.status(200).send({
            status: 'success',
            message: "Blog Updated Successfully.",
            data: result
        })
    } catch (error) {
        res.status(400).send({
            status: 'fail',
            message: "Blog Update Failed.",
            error: error.message
        })
    }
}
exports.deleteBlog = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await deleteBlogServices(id);

        res.status(200).send({
            status: 'success',
            message: "Blog Deleted Successfully.",
            data: result
        })
    } catch (error) {
        res.status(400).send({
            status: 'fail',
            message: "Blog Deletion Failed.",
            error: error.message
        })
    }
}

