const userService = require('./userService')

// GET all Userss
const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers()
    if(users.length == 0){
      return res.status(404).json({message:'No data available at this time'})
    }
    return res.status(200).json(users)
  } catch(error) {
    return res.status(500).json({ error: error.message, stack: error.stack })
  }
}

// GET User Page
const getAllUserPage= async(req,res)=>{
  try{
    const { page } = req.query;
    const users = await userService.getAllUserPage(page)
    if(users.length == 0){
      return res.status(404).json({message:'No data available at this time'})
    }
    return res.status(200).json(users)
  }catch(error)
  {
    return res.status(500).json({ error: error.message, stack: error.stack })
  }
} 

// GET Users by ID
const getUserById = async (req, res) => {
  try {
    const user = await userService.getUser(req.params.id)
    if (!user){
      return res.status(404).json({ message: 'User not found' })
    } 
    return res.status(200).json(user)
  } catch(error) {
    return res.status(500).json({ error: error.message, stack: error.stack })
  }
}

// POST - Add new User
const addUser = async (req, res) => {
  try {
    const { name,surname, email, password,avatar,dateOfBirth } = req.body
    if ( !surname || !email || !password ||!avatar || !dateOfBirth){
      return res.status(400).json({ error: 'Name,Surname,email,avatar,dateofbirth and password are required' })
    } 
    const newUser = await userService.createUser(req.body)
    return res.status(201).json(newUser)
  } catch(error) {
    return res.status(500).json({ error: error.message, stack: error.stack })
  }
}

// DELETE User by ID
const deleteUser = async (req, res) => {
  try {
    const User = await userService.deleteUser(req.params.id)
    if (User.rowCount == 0){
      return res.status(404).json({ message: 'User not found' })
    }   
    return res.status(204).send()
  } catch(error) {
    return res.status(500).json({ error: { message: 'Error deleting User', error: error } })
  }
}

// PATCH - Update User by ID
const updateUser = async (req, res) => {
  try {
    const { id } = req.params
    const { name, email } = req.body
    if (!name || !email || !surname || !avatar){
      return res.status(400).json({ error: 'Name,surname,avatar and email are required' })
    }  
    const updatedUser = await userService.updateUser(id, req.body)
    if(updatedUser.length == 0) {
      return res.status(404).json({ message: 'User not found' })
    }
    return res.status(204).send()
  } catch(error) {
    return res.status(500).json({ error: error.message, stack: error.stack })
  }
}

module.exports = { getAllUsers, getUserById, addUser, deleteUser, updateUser,getAllUserPage }