require("dotenv").config({ path: "./server/.env" });
const jwt= require('jsonwebtoken');

function setUser(user){
    return jwt.sign({
        _id: user._id,
        email: user.email,

    }, process.env.SECRET_KEY,
    {expiresIn: process.env.JWT_EXPIRE})
}

function getUser(token){
    if(!token) return null;
    try {
        return jwt.verify(token, process.env.SECRET_KEY)
    } catch (error) {
        return null;
    }
}

module.exports={
    setUser,
    getUser
}