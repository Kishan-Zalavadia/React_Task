const blogController = require("./blogController")
const express = require('express')
const {validation} = require('../../middleware/validator')
const {createBlogSchema,updateBlogSchema } = require('../../validator/zodSchema/blogSchema')
const {authenticate} = require('./../../middleware/authvalidation')
const router = express.Router()

router.get('/',authenticate,blogController.getAllBlogPage) // get blog page wise
router.get('/:id',authenticate,blogController.getBlogById) // get blog by id
router.post('/',authenticate,validation(createBlogSchema) ,blogController.addBlog)//create new blog
router.get('/user/:id',authenticate,blogController.getBlogByUserId) // blogs of specific user
router.delete('/:id',authenticate,blogController.deleteBlog) //delete blog 
router.patch('/:id',authenticate,validation(updateBlogSchema),blogController.updateBlog ) //update blog

module.exports = router