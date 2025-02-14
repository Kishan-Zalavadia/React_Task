const userController = require('./userController')
const express = require('express')
// const {validation} = require('../middleware/validator')
// const { postRequestSchema, updateRequestSchema} = require('../validator/zodSchema/userSchema')
const router = express.Router()

router.get('/', userController.getAllUserPage)
router.get('/:id', userController.getUserById)
router.post('/', userController.addUser)
router.delete('/:id',userController.deleteUser)
router.patch('/:id', userController.updateUser)

module.exports = router