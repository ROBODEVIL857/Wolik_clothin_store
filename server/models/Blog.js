// console.log(new Date().toDateString().slice(4))
// console.log(new Date().toTimeString().slice(0, 8))

const mongoose = require('mongoose');
const validator = require('validator');
const { ObjectId } = mongoose.Schema.Types;

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide a name for this product."],
        trim: true,
        minLength: [3, "Name must be at least 3 characters."],
        maxLength: [100, "Name is too large."],
    },
    description: {
        type: String,
        required: [true, "Please provide a description for this product."],
        trim: true,
        minLength: [30, "Name must be at least 30 characters."],
        maxLength: [500, "Name is too large."],
    },
    imageUrl: {
        type: String,
        validate: [validator.isURL, "Please provide a valid url"],
        required: true
    },
    createdAt: {
        type: String,
        // required: true
    }
});

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;