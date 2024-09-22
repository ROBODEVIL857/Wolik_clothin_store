const Payment = require('../models/Payment');
const stripe = require('stripe')(process.env.STRIPE_KEY);

exports.createPaymentServices = async (data) => {
    const price = data.amount;
    const amount = price * 100;
    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        payment_method_types: ['card']
    });
    return paymentIntent;
}

exports.postPaymentServices = async (data) => {
    const result = await Payment.create(data);
    return result;
}
exports.getPaymentServices = async (data) => {
    const result = await Payment.find({}).populate('orderId');
    return result;
}