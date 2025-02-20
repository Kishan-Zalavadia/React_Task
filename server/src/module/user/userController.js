const userService = require('./userService')

// GET User Page
const getAllUserPage= async(req,res)=>{
  try{
    const users = await userService.getAllUserPage(req.query)
    if(users.length == 0){
      return res.status(404).json({message:'No data available at this time'}) //change status to 200
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
    const user = await userService.getUserById(req.params.id)
    if (user.length == 0){
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
    const newUser = await userService.createUser(req.body)
    return res.status(201).json(newUser)
  } catch(error) {
    return res.status(500).json({ error: error.message, stack: error.stack })
  }
}

// DELETE User by ID
const deleteUser = async (req, res) => {
  try {
    if(req.userId != req.params.id){
      return res.status(403).json({message:'You can not delete others account'})
    }
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
    if(req.userId != req.params.id){
      return res.status(403).json({message:'You have not access this route'})
    }
    const updatedUser = await userService.updateUser(req.params.id, req.body)
    if(updatedUser.length == 0) {
      return res.status(404).json({ message: 'User not found' })
    }
    return res.status(204).send()
  } catch(error) {
    return res.status(500).json({ error: error.message, stack: error.stack })
  }
}

module.exports = {  getUserById, addUser, deleteUser, updateUser,getAllUserPage }