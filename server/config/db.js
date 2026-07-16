const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017')
.then(()=> console.log("Mongoose is connected"))
.catch(()=>console.log('Error', err))