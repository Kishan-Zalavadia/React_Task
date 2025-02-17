const userRepo = require('./userRespository')
const bcrypt = require('bcrypt')

// Get all users
const getAllUsers = async () => {
  return await userRepo.allUsers()
}

// Get all users Page
const getAllUserPage = async (page) => {
  const offset = (page-1)*10
  return await userRepo.allUserPage(offset)
}

// Add a new user
const createUser = async (req) => {
  const { firstName,lastName,email,password,avatar,dateOfBirth} = req
  const salt = await bcrypt.genSalt()
  const hashedPassword = await bcrypt.hash(password, salt)
  return await userRepo.addUser( firstName,lastName,email, hashedPassword,avatar,dateOfBirth)
}

// Get user by ID
const getUser = async (id) => {
  return await userRepo.getUserById(id)
}

// Delete user by ID
const deleteUser = async (id) => {
  return await userRepo.deleteUser(id)
}

// Update user by ID
const updateUser = async (id, req) => {
    const{name,surname,email,avatar} = req
  return await userRepo.updateUser(id,name,surname,email,avatar)
}

module.exports = { getAllUsers, getUser, createUser, deleteUser, updateUser , getAllUserPage}
