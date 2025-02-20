const jwt = require('jsonwebtoken')
const {config} = require('dotenv')
config()

const authenticate = async(req,res,next)=>{
    try{
        const accessToken= req.headers.accesstoken
        if(!accessToken)return res.status(401).send()
        jwt.verify(accessToken,process.env.accesstokenkey,function (err,decoder){
            if(err){
                res.status(403).json({message:"please login to access"});
            }else{
                res.userId = decoder.id
                next()
            }
        })
    }catch(err){
        return res.status()
    }
    
}

module.exports = {authenticate}