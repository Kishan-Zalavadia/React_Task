const reactionRepo = require('./reactionRespository')

// Like Blog
const likeBlog = async(req)=>{
    const {userId,blogId} = req
    return await reactionRepo.likeDislikeBlog(userId,blogId,true)
}

// Dislike Blog
const dislikeBlog = async(req)=>{
    const {userId,blogId} = req
    return await reactionRepo.likeDislikeBlog(userId,blogId,false)
}

// Remove Reaction
const removeReaction = async(req)=>{
    const {userId,blogId} = req
    return await reactionRepo.removeReaction(userId,blogId)
}

// All Users who like blog
const blogLikedByUsers = async(id)=>{
    const users = await reactionRepo.blogLikedByUsers(id)
    return users
}

// All Users who dislike blog
const blogDislikedByUsers = async(id)=>{
    const users = await reactionRepo.blogDislikedByUsers(id)
    return users
}

module.exports = {likeBlog,dislikeBlog,removeReaction,blogLikedByUsers,blogDislikedByUsers}