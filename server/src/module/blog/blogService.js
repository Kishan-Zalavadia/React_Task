const blogRepo = require('./blogRepository')

// Get Blogs by userid
const getBlogByUserId = async (id, query) => {
  const { size, page } = query
  const numsize = Number(size) || null
  const offset = (page - 1) * size || 0
  const data = await blogRepo.getBlogByUserId(id, numsize, offset);
  const records = await blogRepo.getBlogCountByUserId(id)
  const pagination = {
    totalRecords:Number(records[0].count),
    previousPage:(page==1)?null:Number(page)-1,
    currentPage : Number(page),
    nextPage:(Math.ceil(records[0].count / size)>Number(page))?Number(page)+1:null,
    totalPages: Math.ceil(records[0].count / size)
  }
  if(page>Math.ceil(records[0].count / size)){
    return []
  }
  return {...data,pagination:pagination}
}

// Get all blogs Page
const getAllBlogPage = async (req) => {
  const { size, page } = req
  const numsize = Number(size) || null
  const offset = (page - 1) * size || 0
  const records = await blogRepo.getBlogCount()
  const data = await blogRepo.getAllBlogPage(numsize, offset)
  const pagination = {
    totalRecords:Number(records[0].count),
    previousPage:(page==1)?null:Number(page)-1,
    currentPage : Number(page),
    nextPage:(Math.ceil(records[0].count / size)>Number(page))?Number(page)+1:null,
    totalPages: Math.ceil(records[0].count / size)
  }
  if(page>Math.ceil(records[0].count / size)){
    return []
  }
  return {...data,pagination:pagination}
}

// Get Blog by ID
const getBlogById = async (id) => {
  return await blogRepo.getBlogById(id)
}

// Add New Blog
const addBlog = async (req) => {
  const { userId, title, description } = req
  return await blogRepo.addBlog(userId, title, description)
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