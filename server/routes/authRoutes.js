const express= require('express');
const router = express.Router()
const {handleUserLogOut, handleUserLogin, handleUserRegister}= require("../controllers/authControllers")
const {protect} = require("../middlewares/authMiddlewares")

router.post('/register', handleUserRegister)
router.post('/login', handleUserLogin)
router.post('/logout', handleUserLogOut)

module.exports= router;