require("dotenv").config({ path: "./server/.env" });
const express = require('express');
const app= express();
const PORT= process.env.PORT || 8000;

app.listen(PORT, ()=> console.log(`Server Started at PORT: ${PORT}`))


app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())