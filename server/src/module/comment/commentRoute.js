const commentController = require("./commentController")
const express = require('express')
const {validation} = require('../../middleware/validator')
const {createCommentSchema} = require('./../../validator/zodSchema/commentSchema')
const router = express.Router()

router.get('/blog/:id',commentController.getCommentsByBlogId) // get all comments on specific blog id
router.post('/add',validation(createCommentSchema),commentController.addComment ) //post comment on specific blog id
router.delete('/:id',commentController.deleteComment) //delete the comment permenently 

module.exports = router