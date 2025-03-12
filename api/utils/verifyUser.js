const jwt = require("jsonwebtoken");
const errorHandler = require('./error.js')

const verifyToken = (req, res, next) =>{
    const token = res.cookies.access_token;
    if(!token){
        next(errorHandler(401, "No token Provided"))
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) =>{
        if(err){
            next(errorHandler(404, "Unauthorized"))
        }
        req.user = user;
        next()
    })
}
module.exports = verifyToken;