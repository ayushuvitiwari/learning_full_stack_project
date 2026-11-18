
const users = require('../model/userModels')
const transporter = require('../config/mail')
const os = require('os')
const jwt = require('jsonwebtoken')
const { json } = require('stream/consumers')

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            })
        }

        const user = await users.findOne({ email })

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            })
        }

        if (user.password !== password) {
            return res.status(401).json({
                message: "Invalid password",
                success: false
            })
        }

         const token = jwt.sign(
                {id:user._id,name:user.name},
                process.env.JWT_SECRET,
                {expiresIn:"1d"}
            )
        await transporter.sendMail({
            from: process.env.Email,
            to: email,
            subject: "You have logged in successfully",
            text: `Dear ${user.name},You have logged in successfully on ${os.platform()}`
        })

        return res.status(200).json({
            message: "Login Successfully",
            user,
            success: true,
            token
        })
    } catch (error) {
        res.status(500).json({
            message: "Error in login",
            error: error.message
        })
    }
}
const createUser = async (req, res) => {
    try {
        const user = await users.create(req.body)

        await transporter.sendMail({
            from: process.env.Email,
            to: req.body.email,
            subject: "Welcome to our platform",
            text: `Hello ${req.body.name},Thank you for registration with us.`
        })

        return res.status(201).json({
            message: "User Registration Successfully",
            user,
            success: true
        })

    } catch (error) {
        console.log("Signup Error:", error)

        return res.status(500).json({
            message: "Error in creating user",
            error: error.message,
            success: false
        })
    }
}


const getSingleUser = async(req,res)=>{
    try {
        const user = await users.findById(req.user.id)
        res.status(200).json({message: "user Found", user})
        
    } catch (error) {
        res.status(500).json({message: 'server error', error})
    }
}

const updateUser = async(req,res)=>{
    try {
        const id = req.user.id
        if(id){
            res.status(400).json({message: "User not found", success: false})
        };
        const UpdatedUser = await users.findByIdAndUpdate(
            id,
            req.body,
            {new:true}
        );
        if(!UpdatedUser){
            res.status(400).json({message: "error during updated user", success:false})
        };
        res.status(200).json({message: 'user updated sucessfully', success:true,UpdatedUser})
    } catch (error) {
        console.log(error);
        res.status(400).json({message: 'server error', success:false,error})
        
        
    }
}

module.exports = { createUser, loginUser, getSingleUser }
