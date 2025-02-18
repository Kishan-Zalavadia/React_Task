const reactionController = require("./reactionController")
const express = require('express')

const router = express.Router()

router.post('/like/',reactionController.likeBlog)
router.post('/dislike/',reactionController.dislikeBlog) 
router.post('/remove/',reactionController.removeReaction) 
router.get('/like/:id',reactionController.blogLikedByUsers)
router.get('/dislike/:id',reactionController.blogDislikedByUsers)

module.exports = router