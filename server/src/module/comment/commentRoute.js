const commentController = require("./commentController")
const express = require('express')

const router = express.Router()

router.get('/blog/:id',commentController.getCommentsByBlogId) // get all comments on specific blog id
router.post('/add',commentController.addComment ) //post comment on specific blog id
router.delete('/:id',commentController.deleteComment) //delete the comment permenently 

module.exports = router