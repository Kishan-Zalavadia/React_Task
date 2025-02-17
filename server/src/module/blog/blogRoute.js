const blogController = require("./blogController")
const express = require('express')


const router = express.Router()

router.get('/',blogController.getAllBlogPage) // get all blog
router.get('/:id',blogController.getBlogById) // get blog by id
router.post('/', blogController.addBlog)//create new blog
router.get('/user/:id',blogController.getBlogByUserId) // blogs of specific user
router.delete('/:id',blogController.deleteBlog) //delete blog 
router.patch('/:id',blogController.updateBlog ) //update blog

module.exports = router