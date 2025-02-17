const { comments } = require('../../db/schema')
const db = require('../../config/index')
const { eq, ne, and } = require('drizzle-orm')

// GET comments by blogid
const getCommentsByBlogId = async (id) => {
    const result = await db.select().from(comments).where(and(eq(comments.blogId,id),ne(comments.isCommented,false)))
    return result
}

// Add Comment
const addComment = async(userId,blogId,content)=>{
    const result  = await db.insert(comments).values({userId:userId,blogId:blogId,content:content}).returning()
    return result
}

// Delete Comment by id
const deleteComment = async(id)=>{
    const result = await db.update(comments).set({isCommented:false,deletedAt:new Date()}).where(and(eq(comments.id,id),ne(comments.isCommented,false)))
    return result
}

module.exports = { getCommentsByBlogId ,addComment, deleteComment}


