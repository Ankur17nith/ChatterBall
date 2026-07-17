dotenv.config()
const mongoose = require('mongoose')
const cors = require('cors')
const authRoutes = require("./routes/authRoutes")
const cookieParser = require('cookie-parser')
const connectDB = require('./config/db')
const express = require('express');
const app= express();






app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())

app.use('/api/auth', authRoutes)

app.get('/',(req, res)=>{
    res.json({message: 'Chatterball API is running'})
})

const PORT= process.env.PORT || 8000;
app.listen(PORT, ()=> console.log(`Server Started at PORT: ${PORT}`))
