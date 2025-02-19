const {z} = require('zod')

function validation(schema){
    return ( req, res, next) =>{
        try{
            schema.parse(req.body)
            next();
        }catch(error){
            if(error instanceof z.ZodError){
                return res.status(400).json({errors:error.errors})
            }else{
                return res.status(500).json({error:error.message,stack:error.stack})
            }
        }  
    }
}

module.exports = {validation}