const userController = require('./userController')
const express = require('express')
const {validation} = require('../../middleware/validator')
const {createUserSchema,updateUserSchema } = require('../../validator/zodSchema/userSchema')
const router = express.Router()

router.get('/', userController.getAllUserPage)
router.get('/:id', userController.getUserById)
router.post('/',validation(createUserSchema) ,userController.addUser)
router.delete('/:id',userController.deleteUser)
router.patch('/:id', validation(updateUserSchema),userController.updateUser)

module.exports = router