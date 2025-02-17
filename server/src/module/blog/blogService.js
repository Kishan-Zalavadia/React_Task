const blogRepo = require('./blogRepository')

// // Get all blogs
// const getAllBlogs = async () => {
//   return await blogRepo.allBlogs()
// }

// Get Blogs by userid
const getBlogByUserId = async (id, query) => {
  const { size, page } = query
  const numsize = Number(size)
  const offset = (page - 1) * size
  return await blogRepo.getBlogByUserId(id, numsize, offset);
}

// Get all blogs Page
const getAllBlogPage = async (req) => {
  const { size, page } = req
  const numsize = Number(size)
  const offset = (page - 1) * size
  return await blogRepo.getAllBlogPage(numsize, offset)
}

// Get Blog by ID
const getBlogById = async (id) => {
  return await blogRepo.getBlogById(id)
}

// Add New Blog
const addBlog = async (req) => {
  const { userId, title, description } = req
  const createdAt = new Date()
  return await blogRepo.addBlog(userId, title, description, createdAt)
}

// Delete blog by ID
const deleteBlog = async (id) => {
  return await blogRepo.deleteBlog(id)
}

// Update blog by ID
const updateBlog = async (id, req) => {
  const { title, description } = req
  return await blogRepo.updateBlog(id, title, description)
}


module.exports = { getAllBlogPage, getBlogByUserId, getBlogById, addBlog, deleteBlog, updateBlog }