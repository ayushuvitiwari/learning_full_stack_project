
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const app = express()

const connectDB = require('./config/db')

app.use(cors())
app.use(express.json())

connectDB()

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.send('Welcome to the API')
})

const userRoute = require('./route/userRoute')
app.use('/api/user', userRoute)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})