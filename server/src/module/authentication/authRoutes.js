const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const app = express()
const authController = require('./authController')
app.use(express.json)

router.post('/login',authController.login)
router.get('/',authenticationToken,(req,res)=>{
    res.json({message:"success"})
})

function authenticationToken(req,res,next){
    const authHeader= req.headers['authentication']
    const token = authHeader
    if(token == null)return res.sendStatus(401)
    
    jwt.verify(token,"wqertyuiosadfghjklxzcvbnm",(err,userid)=>{
        if (err) return res.sendStatus(403)    
        next()
    })
}

module.exports = router