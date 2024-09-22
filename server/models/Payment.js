const mongoose = require('mongoose');
const validator = require('validator');
const { ObjectId } = mongoose.Schema.Types;

const paymentSchema = mongoose.Schema({

    orderId: {
        type: ObjectId,
        ref: "Orders"
    },
    transactionID: {
        type: String,
        required: true
    },

}, {
    timestamps: true
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;