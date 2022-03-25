require("dotenv").config()
const jwt = require("jsonwebtoken")

module.exports = function(req,res,next){
    const token = req.header("auth-token")
    if (!token){
        return res.status(403).json({
            success:"false",
            error: "Token required to authenticate!"
        })
    }
    try{
        const decode = jwt.verify(token, process.env.SECRET_KEY)
        req.data = decode
        next()
    }
    catch(e){
        return res.status(401).json({
            success: "false",
            error: "Invalid Token"
        });
    }
}