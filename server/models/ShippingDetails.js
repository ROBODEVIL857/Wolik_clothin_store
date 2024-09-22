const mongoose = require('mongoose');
const validator = require('validator');

const shippingDetailsSchema = mongoose.Schema({

    name: {
        type: String,
        required: [true, "Please provide a name"],
        trim: true,
        minLength: [3, "Name must be at least 3 characters."],
        maxLength: [100, "Name is too large."],
    },

    email: {
        type: String,
        required: [true, "Please provide a email"],
        validate: [validator.isEmail, "Please provide a valid email"],
    },

    phone: {
        type: String,
        required: [true, "Please provide a number"],
    },
    address: {
        type: String,
        required: [true, "Address field is required "],
    },

    notes: {
        type: String,
    },

    amount: {
        type: Number,
        min: [0, "Price can not be less than 0"],
        required: true,
    },

    deliveryStatus: {
        type: String,
        required: true
    },

    paymentMethod: {
        type: String,
        required: true
    },

    paymentStatus: {
        type: String,
        required: true
    },

    orderStatus: {
        type: String,
        required: true,
        default: 'Pending',
        enum: {
            values: ['Completed', 'Pending', 'Cancelled'],
            message: "status can not be {VALUE}, should be 'Completed', 'Pending' or 'Cancelled'"
        },
    },

    products: [{
        title: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        qty: {
            type: Number,
            required: true
        },
        brand: String,
        category: String
    }],

    payment: {
        transactionID: {
            type: String,
        }
    }

}, {
    timestamps: {
        type: Number,
        default: new Date().toDateString()
    }
});

const Orders = mongoose.model("Orders", shippingDetailsSchema);

module.exports = Orders;