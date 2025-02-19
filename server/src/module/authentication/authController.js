const express = require('express')
const userRepo = require('./../user/userRepository')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const app = express()
app.use(express.json)

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email, !password) {
            return res.status(401).json({ message: "Please Provide Email and Password" })
        }
        const user = await userRepo.getUserByEmail(email)
        if (!user) {
            return res.status(404).json({ message: "User not found create account first" })
        }
        const isvalid = await bcrypt.compare(password, user[0].password)
        if (isvalid) {
            const accessToken = jwt.sign(user[0].password, "wqertyuiosadfghjklxzcvbnm", {expiresIn:"1d"})
            return res.setHeader("accessToken", accessToken).status(200).send()
        }
        return res.status(403).json({ message: "invalid user" })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }


}
module.exports = { login }