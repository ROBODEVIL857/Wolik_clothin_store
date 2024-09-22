const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const validator = require('validator');

// schema design 
const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email address is required"],
        trim: true,
        unique: [true, "Email must be unique."],
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid mail."]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        /* validate: {
            validator: (value) =>
                validator.isStrongPassword(value, {
                    minLength: 6,
                    minLowercase: 1,
                    minNumbers: 1,
                    minUppercase: 1,
                    minSymbols: 1
                }),

            message: "Password is not strong enough "
        } */
    },
    confirmPassword: {
        type: String,
        required: [true, "Password is required"],
        validate: {
            validator: function (value) {
                return value === this.password;
            },
            message: "Password don't match."
        }
    },
    role: {
        type: String,
        enum: {
            values: ["user", "admin", "moderator"],
            message: "Role can't be {VALUE}, must be buyer/store-manager/admin",
        }
    },
    firstName: {
        type: String,
        required: [true, "First name is required"],
        trim: true,
        minLength: [3, "Name must be at least 3 characters."],
        maxLength: [100, "Name is too large."],
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"],
        trim: true,
        minLength: [3, "Name must be at least 3 characters."],
        maxLength: [100, "Name is too large."],
    },
    phone: {
        type: String,
        // validate: [validator.isMobilePhone, "Please provide a valid phone number"]
    },
    address: {
        type: String
    },
    country: {
        type: String
    },
    imageUrl: {
        type: String,
        // validate: [validator.isURL, "Please provide a valid url"]
    },
    status: {
        type: String,
        enum: {
            values: ['active', 'inactive', 'blocked'],
            message: "Status can't be {VALUE}, must be active/inactive/blocked",
        },
        default: 'active'
    },
    cart: {
        product: [{
            _id: {
                type: String,
                required: true
            },
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
            discount: {
                type: Number,
            },
            quantity: {
                type: Number,
                required: true
            },
            image: {
                type: String,
                required: true,
            },
            brand: String,
            category: String,
        }],

    },

    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
}, {
    timestamps: true
})


// Schema -> Model -> Query 

const User = mongoose.model('User', userSchema);
module.exports = User;