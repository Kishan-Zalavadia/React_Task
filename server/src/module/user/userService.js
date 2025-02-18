const userRepo = require('./userRespository')
const bcrypt = require('bcrypt')

// Get all users Page
const getAllUserPage = async (req) => {
  const {page,size} = req
  const numsize = size || null
  const offset = (page-1) * numsize || 0
  console.log(typeof numsize,typeof offset)
  return await userRepo.allUserPage(size,offset)
}

// Add a new user
const createUser = async (req) => {
  const { firstName,lastName,email,password,avatar,dateOfBirth} = req
  const salt = await bcrypt.genSalt()
  const hashedPassword = await bcrypt.hash(password, salt)
  return await userRepo.addUser( firstName,lastName,email, hashedPassword,avatar,dateOfBirth)
}

// Get user by ID
const getUserById = async (id) => {
  return await userRepo.getUserById(id)
}

// Delete user by ID
const deleteUser = async (id) => {
  return await userRepo.deleteUser(id)
}

// Update user by ID
const updateUser = async (id, req) => {
    const{firstName,lastName,email,avatar} = req
  return await userRepo.updateUser(id,firstName,lastName,email,avatar)
}

module.exports = { getUserById, createUser, deleteUser, updateUser , getAllUserPage}
