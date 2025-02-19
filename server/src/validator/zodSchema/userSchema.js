const { z } = require('zod')

const createUserSchema = z.object({
    firstName: z.string().trim().min(3, 'FirstName should contain atlist 3 char'),
    lastName: z.string().trim().min(3,'LastName should contain atlist 3 char'),
    email: z.string().email(),
    password: z.string().min(8, 'password should have atlist 8 char').max(20, 'password should have maximum 20 char').regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/, 'password should contain atlist one uppercase,one lowercase and one digit'),
    dateOfBirth:z.string().date({ message: "Invalid date string!" })
})

const updateUserSchema = z.object({
    firstName: z.string().trim().min(3, 'FirstName should contain atlist 3 char'),
    lastName: z.string().trim().min(3,'LastName should contain atlist 3 char'),
    email: z.string().email()
})

module.exports = { createUserSchema, updateUserSchema }