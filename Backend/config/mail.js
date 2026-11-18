
const nodemailer = require('nodemailer')
require('dotenv').config()

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.Email,
        pass: process.env.Password
    }
})

module.exports = transporter
