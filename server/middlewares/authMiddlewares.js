const dotenv = require("dotenv");
const User = require('../models/User');
const {getUser}= require("../utils/generateToken");

const protect = async (req, res, next)=>{
    let token;

    if(req.cookie && req.cookie.token){
        token= req.cookie.token;
    }
    else if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }

    if(!token){
        return res.status(404).json({
            success:false,
            message: "Not authorized: Token Not Found!"
        })
    }
    try {
        const decoded= getUser(token);
        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: 'Invalid or expired token'
            })
        }
        const user = User.findById(decoded._id)

        if(!user){
            return res.status(401).json({
                success: false,
                messaage: "User no longer exists"
            })
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Invalid or expired token"
        })
    }
}

module.exports = {protect}