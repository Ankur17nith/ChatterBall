const mongoose = require('mongoose');

const connectDB = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL)
        console.log("Mongoose is connected")
    } catch (error) {
        console.log('Error', error);
        process.exit(1);
    }
}

module.exports = connectDB;
