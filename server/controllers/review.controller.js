const { createReviewServices, getReviewServices, getReviewServicesById, getReviewServicesByProductId } = require("../services/review.services");


exports.createReview = async(req, res, next) => {
    try {
        const result = await createReviewServices(req.body);
        res.status(200).send({
            status: 'success',
            message: "Review created successfully",
            data: result
        })
    } catch (error) {
        res.status(400).send({
            status: 'fail',
            message: "Could not create the Review",
            error: error.message
        })
    }
}

exports.getReviews = async(req, res, next) => {
    try {
        const result = await getReviewServices();
        res.status(200).send({
            status: 'success',
            message: "Reviews get successfully",
            data: result
        })
    } catch (error) {
        res.status(400).send({
            status: 'fail',
            message: "Could not find any Reviews",
            error: error.message
        })
    }
}

exports.getReviewById = async(req, res, next) => {
    const { id } = req.params;
    try {
        const result = await getReviewServicesById(id);
        if(!result){
            return res.status(400).send({
                status: 'fail',
                message: "Could not find any Review with this ID",
                error: error.message
            })
        }
        res.status(200).send({
            status: 'success',
            message: "Review get successfully",
            data: result
        })
    } catch (error) {
        res.status(400).send({
            status: 'fail',
            message: "Could not find any Reviews",
            error: error.message
        })
    }
}

exports.getReviewByProductId = async(req, res, next) => {
    const { productId } = req.params;
    // console.log(req.params);
    try {
        const result = await getReviewServicesByProductId(productId);
        if(!result){
            return res.status(400).send({
                status: 'fail',
                message: "Could not find any Review with this ID",
                // error: error.message
            })
        }
        res.status(200).send({
            status: 'success',
            message: "Review get successfully",
            data: result
        })
    } catch (error) {
        res.status(400).send({
            status: 'fail',
            message: "Could not find any Reviews",
            error: error.message
        })
    }
}
