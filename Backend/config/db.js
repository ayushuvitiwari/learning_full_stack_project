const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config();
const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MongoURL)
        console.log("MongoDB is connected")
    }catch(error){
        console.log(error);
    }
}
module.exports = connectDB