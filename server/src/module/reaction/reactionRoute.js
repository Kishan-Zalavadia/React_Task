const reactionController = require("./reactionController")
const express = require('express')
const {authenticate} = require('./../../middleware/authvalidation')
const router = express.Router()

router.post('/like/',authenticate,reactionController.likeBlog)
router.post('/dislike/',authenticate,reactionController.dislikeBlog) 
router.post('/remove/',authenticate,reactionController.removeReaction) 
router.get('/like/:id',authenticate,reactionController.blogLikedByUsers)
router.get('/dislike/:id',authenticate,reactionController.blogDislikedByUsers)

module.exports = router