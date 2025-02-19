const express = require('express')
const router = express.Router()
const userController = require('./../user/userController')
const {validation} = require('../../middleware/validator')
const {createUserSchema} = require('../../validator/zodSchema/userSchema')
const app = express()
const authController = require('./authController')
app.use(express.json)

router.post('/login',authController.login)
router.post('/register',validation(createUserSchema),userController.addUser)

module.exports = router