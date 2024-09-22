const { createBrandServices, getBrandServices, getBrandServicesById, updateBrandServicesById } = require("../services/brand.services")

exports.createBrand = async(req, res, next) => {
    try {
        const result = await createBrandServices(req.body);
        res.status(200).send({
            status: 'success',
            message: "Brand created successfully",
            data: result
        })
    } catch (error) {
        res.status(400).send({
            status: 'fail',
            message: "Could not create the brand",
            error: error.message
        })
    }
}
exports.getBrands = async(req, res, next) => {
    try {
        const result = await getBrandServices();
        res.status(200).send({
            status: 'success',
            message: "Brands get successfully",
            data: result
        })
    } catch (error) {
        res.status(400).send({
            status: 'fail',
            message: "Could not find any brands",
            error: error.message
        })
    }
}
exports.getBrandById = async(req, res, next) => {
    const { id } = req.params;
    try {
        const result = await getBrandServicesById(id);
        if(!result){
            return res.status(400).send({
                status: 'fail',
                message: "Could not find any brand with this ID",
                error: error.message
            })
        }
        res.status(200).send({
            status: 'success',
            message: "Brand get successfully",
            data: result
        })
    } catch (error) {
        res.status(400).send({
            status: 'fail',
            message: "Could not find any brands",
            error: error.message
        })
    }
}
