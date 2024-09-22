const { createCategoryServices, getCategoryServices, getCategoryServicesById } = require("../services/category.services");

exports.createCategory = async(req, res, next) => {
    try {
        const result = await createCategoryServices(req.body);
        res.status(200).send({
            status: 'success',
            message: "Category created successfully",
            data: result
        })
    } catch (error) {
        res.status(400).send({
            status: 'fail',
            message: "Could not create the Category",
            error: error.message
        })
    }
}
exports.getCategories = async(req, res, next) => {
    try {
        const result = await getCategoryServices();
        res.status(200).send({
            status: 'success',
            message: "Categorys get successfully",
            data: result
        })
    } catch (error) {
        res.status(400).send({
            status: 'fail',
            message: "Could not find any Categories",
            error: error.message
        })
    }
}
exports.getCategoryById = async(req, res, next) => {
    const { id } = req.params;
    try {
        const result = await getCategoryServicesById(id);
        if(!result){
            return res.status(400).send({
                status: fail,
                message: "Could not find any Category with this ID",
                error: error.message
            })
        }
        res.status(200).send({
            status: 'success',
            message: "Category get successfully",
            data: result
        })
    } catch (error) {
        res.status(400).send({
            status: 'fail',
            message: "Could not find any Categories",
            error: error.message
        })
    }
}
