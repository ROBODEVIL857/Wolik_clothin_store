const { createPaymentServices, postPaymentServices, getPaymentServices } = require("../services/payment.services");

exports.createPayment = async (req, res, next) => {
    // console.log(req.body)
    try {
        const result = await createPaymentServices(req.body);
        res.status(200).send({
            status: 'success',
            message: ' Successfully get the Purchase',
            data: { 
                clientSecret: result.client_secret 
            }
        })
    } catch (error) {
        res.status(400).send({
            status: 'fail',
            message: ' Failed to get the payment',
            error: error.message
        })
    }

}

exports.postPayment = async(req, res, next) => {
    try {
        const result = await postPaymentServices(req.body);
        res.status(200).send({
            status: 'success',
            message: "Paymnet successfull",
            data: result
        })
    } catch (error) {
        res.status(400).send({
            status: 'fail',
            message: "Could not create the payment",
            error: error.message
        })
    }
}
exports.getPayment = async(req, res, next) => {
    try {
        const result = await getPaymentServices();
        res.status(200).send({
            status: 'success',
            message: "Paymnet get successfully",
            data: result
        })
    } catch (error) {
        res.status(400).send({
            status: 'fail',
            message: "Could not get the payment",
            error: error.message
        })
    }
}