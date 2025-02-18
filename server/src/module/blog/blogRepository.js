const { users, blogs, comments, reactions } = require('./../../db/schema')
const db = require('./../../config/index')
const { eq, sql, ne, and } = require('drizzle-orm')

const getBlogByUserId = async (id, numsize, offset) => {
  const blog = await db.select({
    id: blogs.id,
    title: blogs.title,
    description: blogs.description,
    createdAt: blogs.createdAt,
    updatedAt: blogs.updatedAt,
    isActive: blogs.isActive,
    likesCount: sql`COUNT(DISTINCT reactions.id) FILTER (WHERE ${reactions.isLiked} = true)`,
    dislikesCount: sql`COUNT(DISTINCT reactions.id) FILTER (WHERE ${reactions.isLiked} = false)`,
    commentsCount: sql`COUNT(DISTINCT comments.id) FILTER (WHERE ${comments.isCommented} = true)`
  })
    .from(blogs)
    .leftJoin(reactions, eq(blogs.id, reactions.blogId))
    .leftJoin(comments, eq(blogs.id, comments.blogId))
    .where(and(eq(blogs.userId, id), eq(blogs.isActive, true)))
    .groupBy(blogs.id)
    .limit(numsize)
    .offset(offset);
    
  return blog
}


// Get all Blogs with like and comment count
const getAllBlogPage = async (numsize, offset) => {
  const blog = await db.select({
    id: blogs.id,
    title: blogs.title,
    description: blogs.description,
    createdAt: blogs.createdAt,
    updatedAt: blogs.updatedAt,
    userId: blogs.userId,
    userName: users.firstName,
    isActive: blogs.isActive,
    likesCount: sql`COUNT(DISTINCT reactions.id) FILTER (WHERE ${reactions.isLiked} = true)`, // Count likes
    dislikesCount: sql`COUNT(DISTINCT reactions.id) FILTER (WHERE ${reactions.isLiked} = false)`, // Count dislikes
    commentsCount: sql`COUNT(DISTINCT comments.id) FILTER (WHERE ${comments.isCommented} = true)` // Count unique comments
  }).from(blogs)
    .leftJoin(users, eq(blogs.userId, users.id)) // Join users table
    .leftJoin(reactions, eq(blogs.id, reactions.blogId)) // Join interactions (likes)
    .leftJoin(comments, eq(blogs.id, comments.blogId)) // Join comments table
    .where(eq(blogs.isActive, true))
    .groupBy(blogs.id, users.firstName)
    .limit(numsize)
    .offset(offset);
  return blog;
}

// Get Blog by ID
const getBlogById = async (id) => {
  const blog = await db.select({
    id: blogs.id,
    title: blogs.title,
    description: blogs.description,
    createdAt: blogs.createdAt,
    updatedAt: blogs.updatedAt,
    userId: blogs.userId,
    userName: users.firstName,
    isActive: blogs.isActive,
    likesCount: sql`COUNT(DISTINCT reactions.id) FILTER (WHERE ${reactions.isLiked} = true)`, // Count likes
    dislikesCount: sql`COUNT(DISTINCT reactions.id) FILTER (WHERE ${reactions.isLiked} = false)`, // Count dislikes
    commentsCount: sql`COUNT(DISTINCT comments.id)FILTER (WHERE ${comments.isCommented} = true)` // Count unique comments
  }).from(blogs)
    .leftJoin(users, eq(blogs.userId, users.id)) // Join users table
    .leftJoin(reactions, eq(blogs.id, reactions.blogId)) // Join interactions (likes)
    .leftJoin(comments, eq(blogs.id, comments.blogId)) // Join comments table
    .where(and(eq(blogs.id, id), eq(blogs.isActive, true)))
    .groupBy(blogs.id, users.firstName)
  return blog;
}

// Add a new blog
const addBlog = async (userId, title, description, createdAt) => {
  const result = await db.insert(blogs).values({ userId: userId, title: title, description: description, createdAt: createdAt }).returning()
  return result
}

// Delete a blog
const deleteBlog = async (id) => {
  const result = db.update(blogs).set({ isActive: false, deletedAt: new Date() }).where(and(eq(blogs.id, id), ne(blogs.isActive, false)))
  return result
}

// Update a blog
const updateBlog = async (id, title, description) => {
  const updateAt = new Date()
  const result = await db.update(blogs).set({ title: title, description: description, updatedAt: updateAt }).where(and(eq(blogs.id, id), eq(blogs.isActive, true))).returning();
  return result
}

module.exports = { getAllBlogPage, getBlogByUserId, getBlogById, addBlog, deleteBlog, updateBlog }