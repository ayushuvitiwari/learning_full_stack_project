const express = require('express')
const router = express.Router()

const { createUser, loginUser, getSingleUser } = require('../controlling/userControler')

const auth = require('../middleware/auth')

router.post('/register', createUser)
router.post('/login', loginUser)
router.get('/get-single-user',auth, getSingleUser)

module.exports = router
