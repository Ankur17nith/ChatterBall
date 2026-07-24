const dotenv = require("dotenv");
const mongoose = require('mongoose')
const cors = require('cors')
const authRoutes = require("./routes/authRoutes")
const roomRoutes = require("./routes/roomRoutes")
const cookieParser = require('cookie-parser')
const connectDB = require('./config/db')
const express = require('express');
const app= express();
const {Server}= require('socket.io')
const http= require('http')

dotenv.config();

const httpServer = http.createServer(app);

const io = new Server(httpServer,{
    cors:{
        origin: process.env.CLIENT_URL,
        credentials: true
    },
    transports: ["websocket", "polling"]
})

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use("/api/rooms", roomRoutes)

app.get('/',(req, res)=>{
    return res.json({message: 'Chatterball API is running'})
})

const PORT= process.env.PORT || 8000;
app.listen(PORT, ()=> console.log(`Server Started at PORT: ${PORT}`))
