const commentRepo = require('./commentRepository')

// GET Comments by BlogId
const getCommentsByBlogId = async(id)=>{
    return await commentRepo.getCommentsByBlogId(id)
}

// Add Comment
const addComment = async(req)=>{
    const {userId,blogId,content} = req
    return await commentRepo.addComment(userId,blogId,content)
}

// Delete Comment
const deleteComment = async(id)=>{
    return await commentRepo.deleteComment(id)
}

module.exports = {getCommentsByBlogId,addComment,deleteComment}