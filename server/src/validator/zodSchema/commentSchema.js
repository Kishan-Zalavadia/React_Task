const { z } = require('zod')

const createCommentSchema = z.object({
    userId: z.string().uuid(),
    blogId: z.string().uuid(),
    content: z.string().trim().min(1, "minimum 1 length require for comment")
})

module.exports = { createCommentSchema }