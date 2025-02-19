const commentService = require('./commentService')

// GET Comments by BlogId
const getCommentsByBlogId = async (req, res) => {
    try {
        const comments = await commentService.getCommentsByBlogId(req.params.id)
        if (comments.length == 0) {
            return res.status(404).json({ message: 'No data available at this time' })
        }
        return res.status(200).json(comments)
    } catch (error) {
        console.log(error.stack)
        return res.status(500).json({ error: error.message })
    }
}

// POST - Add new Comment
const addComment = async (req, res) => {
    try {
        const { userId, blogId, content } = req.body
        if (!userId || !blogId || !content) {
            return res.status(400).json({ error: 'user,blog and contect are required' })
        }
        const newComment = await commentService.addComment(req.body)
        return res.status(201).json(newComment)
    } catch (error) {
        return res.status(500).json({ error: error.message, stack: error.stack })
    }
}

// Delete Comment
const deleteComment = async (req, res) => {
    try {
        const result = await commentService.deleteComment(req.params.id)
        if (result.rowCount != 1) {
            return res.status(404).json({ message: 'Comment not found' })
        }
        return res.status(204).send()
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = { getCommentsByBlogId, addComment, deleteComment }