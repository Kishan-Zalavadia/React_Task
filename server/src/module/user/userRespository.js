const {users} = require('./../../db/schema')
const db = require('./../../config/index')
const {eq} = require('drizzle-orm')

// Get all users
const allUsers = async () => {
  const user = await db.select().from(users);
  return user; 
}

// Get all user page
const allUserPage = async (offset) => {
  const user = await db.select().from(users).limit(10).offset(offset);
  return user; 
}

// Get a user by ID
const getUserById = async (id) => {
  const user = await db.select().from(users).where(eq(users.id,id));
  return user
}

// Add a new user
const addUser = async (name,surname,email,password,avatar,dateOfBirth) => {
  const result = await db.insert(users).values({name:name,surname:surname,email:email,password:password,avatar:avatar,dateOfBirth:dateOfBirth}).returning()
  return result
}

// Delete a user
const deleteUser = async (id) => {
  const result = db.delete(users).where(eq(users.userId,id))
  return result
}

// Update a user
const updateUser = async (id,name,surname,email,avatar) => {
  const result = await db.update(users).set({name:name,email:email,surname:surname,avatar:avatar}).where(eq(users.userId,id)).returning();
  return result
}

module.exports = { allUsers, getUserById, addUser, deleteUser, updateUser,allUserPage}