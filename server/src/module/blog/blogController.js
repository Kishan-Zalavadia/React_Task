const blogService = require('./blogService')

// Get Blogs by userid
const getBlogByUserId = async (req, res) => {
  try {
    const userblog = await blogService.getBlogByUserId(req.params.id, req.query);
    if (userblog.length == 0) {
      return res.status(404).json({ message: "Nodata available at this time" })
    }
    return res.status(200).json(userblog);
  } catch (error) {
    console.log(error.stack)
    return res.status(500).json({ error: error.message })
  }
}

// GET Blog Page
const getAllBlogPage = async (req, res) => {
  try {
    const blogs = await blogService.getAllBlogPage(req.query)
    if (blogs.length == 0) {
      return res.status(404).json({ message: 'No data available at this time' })
    }
    return res.status(200).json(blogs)
  } catch (error) {
    return res.status(500).json({ error: error.message, stack: error.stack })
  }
}

// GET Blogs by ID
const getBlogById = async (req, res) => {
  try {
    const blog = await blogService.getBlogById(req.params.id)
    if (!blog) {
      return res.status(404).json({ message: 'User not found' })
    }
    return res.status(200).json(blog)
  } catch (error) {
    return res.status(500).json({ error: error.message, stack: error.stack })
  }
}

// POST - Add new Blog
const addBlog = async (req, res) => {
  try {
    const newBlog = await blogService.addBlog(req.body)
    return res.status(201).json(newBlog)
  } catch (error) {
    return res.status(500).json({ error: error.message, stack: error.stack })
  }
}

// DELETE Blog by ID
const deleteBlog = async (req, res) => {
  try {
    if(req.userId != req.params.id){
      return res.status(403).json({message:'You can not access this route'})
    }
    const result = await blogService.deleteBlog(req.params.id)
    console.log(result)
    if (result.rowCount == 0) {
      return res.status(404).json({ message: 'Blog not found' })
    }
    return res.status(204).send()
  } catch (error) {
    return res.status(500).json({ error: { message: 'Error deleting Blog', error: error } })
  }
}

// PATCH - Update Blog by ID
const updateBlog = async (req, res) => {
  try {
    if(req.userId != req.params.id){
      return res.status(403).json({message:'You can not delete others account'})
    }
    const updatedBlog = await blogService.updateBlog(req.params.id, req.body)
    if (updatedBlog.length == 0) {
      return res.status(404).json({ message: 'Blog not found' })
    }
    return res.status(204).send()
  } catch (error) {
    return res.status(500).json({ error: error.message, stack: error.stack })
  }
}

module.exports = { getAllBlogPage, getBlogByUserId, getBlogById, addBlog, deleteBlog, updateBlog }