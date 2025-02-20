const reactionServide = require('./reactionService')

// Like blog 
const likeBlog = async (req, res) => {
    try {
        const { userId, blogId } = req.body
        if(req.userId != userId){
            return res.status(403).json({message:'You can access this route'})
          }
        if (!userId || !blogId) {
            return res.status(400).json({ error: 'userId and blogId is reauqired' })
        }
        await reactionServide.likeBlog(req.body)
        return res.status(204).send()
    }catch(error){
        return res.status(500).json({ error: error.message, stack: error.stack })
    }
}

// Dislike blog
const dislikeBlog = async (req, res) => {
    try {
        const { userId, blogId } = req.body
        if(req.userId != userId){
            return res.status(403).json({message:'You can access this route'})
          }
        if (!userId || !blogId) {
            return res.status(400).json({ error: 'userId and blogId is reauqired' })
        }
        await reactionServide.dislikeBlog(req.body)
        return res.status(204).send()
    }catch(error){
        return res.status(500).json({ error: error.message, stack: error.stack })
    }
}

// Remove Reaction
const removeReaction = async (req, res) => {
    try {
        const { userId, blogId } = req.body
        if(req.userId != userId){
            return res.status(403).json({message:'You can access this route'})
          }
        if (!userId || !blogId) {
            return res.status(400).json({ error: 'userId and blogId is reauqired' })
        }
        await reactionServide.removeReaction(req.body)
        return res.status(204).send()
    }catch(error){
        return res.status(500).json({ error: error.message, stack: error.stack })
    }
}

// List of users who like blog by blogId
const blogLikedByUsers = async(req,res)=>{
    try {
        const users = await reactionServide.blogLikedByUsers(req.params.id)
        return res.status(200).json(users)
    }catch(error){
        return res.status(500).json({ error: error.message, stack: error.stack })
    }
}

// List of users who like blog by blogId
const blogDislikedByUsers = async(req,res)=>{
    try {
        const users = await reactionServide.blogDislikedByUsers(req.params.id)
        return res.status(200).json(users)
    }catch(error){
        return res.status(500).json({ error: error.message, stack: error.stack })
    }
}

module.exports = {likeBlog,dislikeBlog,removeReaction,blogLikedByUsers,blogDislikedByUsers}
