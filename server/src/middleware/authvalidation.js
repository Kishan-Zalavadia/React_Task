const jwt = require('jsonwebtoken')
const authenticate = async(req,res,next)=>{
    try{
        const accessToken= req.headers.accesstoken
        if(!accessToken)return res.status(401).send()
        jwt.verify(accessToken,"wqertyuiosadfghjklxzcvbnm",function (err,decoder){
            if(err){
                res.status(403).json({message:"please login to access"});
            }else{
                next()
            }
        })
    }catch(err){
        return res.status()
    }
    
}

module.exports = {authenticate}