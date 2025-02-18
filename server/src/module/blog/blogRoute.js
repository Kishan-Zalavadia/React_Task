const blogController = require("./blogController")
const express = require('express')
const {validation} = require('../../middleware/validator')
const {createBlogSchema,updateBlogSchema } = require('../../validator/zodSchema/blogSchema')

const router = express.Router()

router.get('/',blogController.getAllBlogPage) // get blog page wise
router.get('/:id',blogController.getBlogById) // get blog by id
router.post('/',validation(createBlogSchema) ,blogController.addBlog)//create new blog
router.get('/user/:id',blogController.getBlogByUserId) // blogs of specific user
router.delete('/:id',blogController.deleteBlog) //delete blog 
router.patch('/:id',validation(updateBlogSchema),blogController.updateBlog ) //update blog

module.exports = router