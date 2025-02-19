const { z } = require('zod')

const createBlogSchema = z.object({
    userId: z.string().uuid(),
    title: z.string().trim().min(5, "minimum 5 words are required in title").max(250, "It should contain maximun 250 words"),
    description: z.string().trim().min(15, "minimum 15 words require in description")
})

const updateBlogSchema = z.object({
    title: z.string().trim().min(5, "minimum 5 words are required in title").max(250, "It should contain maximun 250 words"),
    description: z.string().trim().min(15, "minimum 15 words require in description"),
})

module.exports = {createBlogSchema,updateBlogSchema}