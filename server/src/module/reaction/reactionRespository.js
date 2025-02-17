const { and, eq } = require("drizzle-orm")
const db = require("./../../config/index")
const { reactions, users } = require('./../../db/schema')

// Like Blog
const likeDislikeBlog = async (userId, blogId, isLiked) => {
    const result = await db.select().from(reactions).where(and(eq(reactions.userId, userId), eq(reactions.blogId, blogId)))
    if (result.length == 0) {
        return await db.insert(reactions).values({ userId: userId, blogId: blogId, isLiked: isLiked })
    }
    else {
        return await db.update(reactions).set({ isLiked: isLiked }).where(and(eq(reactions.userId, userId), eq(reactions.blogId, blogId)))
    }
}

// Remove Reaction
const removeReaction = async (userId, blogId) => {
    const res = await db.update(reactions).set({ isLiked: null }).where(and(eq(reactions.userId, userId), eq(reactions.blogId, blogId)))
    return res
}

// All User Who like blog by blog id
const blogLikedByUsers = async(id)=>{
    const res =  await db.select({Name:users.firstName}).from(reactions).innerJoin(users,eq(users.id,reactions.userId)).where(and(eq(reactions.blogId,id),eq(reactions.isLiked,true)))
    return res
}


module.exports = { likeDislikeBlog, removeReaction,blogLikedByUsers }