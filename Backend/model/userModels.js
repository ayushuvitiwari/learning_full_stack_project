const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name:String,
   email: {
    type: String,
    unique: true,
    required: true
},
    phone:String,
    address:String,
    password:{
        type:String,
        required:true,
    },
    DOB:String,
    PinCode:String
})

module.exports = mongoose.model('users',userSchema)