const userController = require('./userController')
const express = require('express')
const {validation} = require('../../middleware/validator')
const {createUserSchema,updateUserSchema } = require('../../validator/zodSchema/userSchema')
const router = express.Router()
const {authenticate} = require('./../../middleware/authvalidation')

router.get('/',authenticate, userController.getAllUserPage)
router.get('/:id',authenticate ,userController.getUserById)
router.post('/',validation(createUserSchema) ,userController.addUser)
router.delete('/:id',authenticate,userController.deleteUser)
router.patch('/:id',authenticate, validation(updateUserSchema),userController.updateUser)

module.exports = router