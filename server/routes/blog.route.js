const express = require('express');
const blogController = require('../controllers/blog.controller');
const auth = require('../middleware/auth');
const verifyToken = require('../middleware/verifyToken');
const blogRoute = express.Router();

blogRoute.route('/')
    .post(verifyToken, auth('admin'), blogController.createBlog)
    .get(blogController.getBlogs)
blogRoute.route('/:id')
    .get(blogController.getBlogById)
    .patch(verifyToken, auth('admin'), blogController.updateBlog)
    .delete(verifyToken, auth('admin'), blogController.deleteBlog)

module.exports = blogRoute;