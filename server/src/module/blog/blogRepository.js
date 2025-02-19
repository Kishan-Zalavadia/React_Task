const { users, blogs, comments, reactions } = require('./../../db/schema')
const db = require('./../../config/index')
const { eq, sql, ne, and } = require('drizzle-orm');
const { getCommentsByBlogId } = require('../comment/commentRepository');

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
    commentsCount: sql`COUNT(DISTINCT comments.id)`
  })
    .from(blogs)
    .leftJoin(reactions, eq(blogs.id, reactions.blogId))
    .leftJoin(comments, and(eq(blogs.id, comments.blogId), eq(comments.isCommented, true)))
    .where(and(eq(blogs.userId, id), eq(blogs.isActive, true)))
    .groupBy(blogs.id)
    .limit(numsize)
    .offset(offset);
    for(i=0;i<blog.length;i++)
      {
        const comments = await getCommentsByBlogId(blog[i].id)
        blog[i].comments = comments
      }
    return { data: blog }
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
    likesCount: sql`COUNT(DISTINCT reactions.id) FILTER (WHERE ${reactions.isLiked} = true)`,
    dislikesCount: sql`COUNT(DISTINCT reactions.id) FILTER (WHERE ${reactions.isLiked} = false)`,
    commentsCount: sql`COUNT(DISTINCT comments.id)`,
  }).from(blogs)
    .leftJoin(users, eq(blogs.userId, users.id))
    .leftJoin(reactions, eq(blogs.id, reactions.blogId))
    .leftJoin(comments, and(eq(blogs.id, comments.blogId), eq(comments.isCommented, true)))
    .where(eq(blogs.isActive, true))
    .groupBy(blogs.id, users.id)
    .limit(numsize)
    .offset(offset);
    for(i=0;i<blog.length;i++)
      {
        const comments = await getCommentsByBlogId(blog[i].id)
        blog[i].comments = comments
      }
  return { data: blog };
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
    likesCount: sql`COUNT(DISTINCT reactions.id) FILTER (WHERE ${reactions.isLiked} = true)`,
    dislikesCount: sql`COUNT(DISTINCT reactions.id) FILTER (WHERE ${reactions.isLiked} = false)`,
    commentsCount: sql`COUNT(DISTINCT comments.id)`
  }).from(blogs)
    .innerJoin(users, eq(blogs.userId, users.id))
    .leftJoin(reactions, eq(blogs.id, reactions.blogId))
    .leftJoin(comments, and(eq(blogs.id, comments.blogId), eq(comments.isCommented, true)))
    .where(and(eq(blogs.id, id), eq(blogs.isActive, true)))
    .groupBy(blogs.id, users.id)
    for(i=0;i<blog.length;i++)
    {
      const comments = await getCommentsByBlogId(blog[i].id)
      blog[i].comments = comments
    }
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

// Get Blog Count
const getBlogCount = async () => {
  return await db.select({ count: sql`count(*)` }).from(blogs).where(eq(blogs.isActive,true))
}

//Get Blog Count By User ID
const getBlogCountByUserId = async(id)=>{
  return await db.select({count: sql`count(*)`}).from(blogs).where(and(eq(blogs.isActive,true),eq(blogs.userId,id)))
}

module.exports = {getBlogCountByUserId, getBlogCount, getAllBlogPage, getBlogByUserId, getBlogById, addBlog, deleteBlog, updateBlog }