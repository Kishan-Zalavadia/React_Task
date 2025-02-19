const commentController = require("./commentController")
const express = require('express')
const {validation} = require('../../middleware/validator')
const {createCommentSchema} = require('./../../validator/zodSchema/commentSchema')
const router = express.Router()
const {authenticate} = require('./../../middleware/authvalidation')

router.get('/blog/:id',authenticate,commentController.getCommentsByBlogId) // get all comments on specific blog id
router.post('/add',authenticate,validation(createCommentSchema),commentController.addComment ) //post comment on specific blog id
router.delete('/:id',authenticate,commentController.deleteComment) //delete the comment permenently 

module.exports = router