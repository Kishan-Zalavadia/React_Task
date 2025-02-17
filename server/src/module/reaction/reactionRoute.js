const reactionController = require("./reactionController")
const express = require('express')

const router = express.Router()

router.post('/like/',reactionController.likeBlog)
router.post('/dislike/',reactionController.dislikeBlog) 
router.post('/remove/',reactionController.removeReaction) 
router.get('/:id',reactionController.blogLikedByUsers)

module.exports = router