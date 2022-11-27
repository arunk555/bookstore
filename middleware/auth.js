const { verify } = require("jsonwebtoken");
const {JWT_KEY} = process.env;
const verifyToken=(req, res, next)=>{
    const { authorization } = req.headers;
    const token=(authorization)? authorization.split(' ')[1]:'';
    if(!token){
        return res.status(403).json({
            status: false,
            message: "Unable to proceed with your request without a token!"
        })
    }
    const data = verify(token, JWT_KEY, function(err, data){
       if(err) throw new Error(err.message); 
       req.admuser = data;
    })
    next();
}

module.exports = verifyToken;