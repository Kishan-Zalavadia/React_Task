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
  const user = await db.select().from(users).limit(10).offset(offset).where(eq(users.isActive,true));
  return user; 
}

// Get a user by ID
const getUserById = async (id) => {
  const user = await db.select().from(users).where(and(eq(users.id,id),eq(users.isActive,true)));
  return user
}

// Add a new user
const addUser = async ( firstName,lastName,email,password,avatar,dateOfBirth) => {
  const result = await db.insert(users).values({firstName:firstName,lastName:lastName,email:email,password:password,avatar:avatar,dateOfBirth:dateOfBirth}).returning()
  return result
}

// Delete a user
const deleteUser = async (id) => {
  const result = db.update(users).set({isActive:false,deletedAt:new Date()}).where(and(eq(users.id,id),eq(users.isActive,true)))
  return result
}

// Update a user
const updateUser = async (id,name,surname,email,avatar) => {
  const result = await db.update(users).set({name:name,email:email,surname:surname,avatar:avatar}).where(and(eq(users.userId,id)),eq(users.isActive,true)).returning();
  return result
}

module.exports = { allUsers, getUserById, addUser, deleteUser, updateUser,allUserPage}