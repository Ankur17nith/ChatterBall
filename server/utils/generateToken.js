require("dotenv").config({ path: "./server/.env" });
const jwt= require('jsonwebtoken');

function setUser(user){
    return jwt.sign({
        _id: user._id,

    }, process.env.JWT_SECRET,
    {expiresIn: process.env.JWT_EXPIRE})
}

function getUser(token){
    if(!token) return null;
    try {
        return jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        return null;
    }
}

module.exports={
    setUser,
    getUser
}