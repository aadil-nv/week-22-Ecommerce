const express = require('express')
const userRouter =express.Router()
const userControler = require('../Controller/userController')
const isAuthenticated = require('../Middleware/isAuthenticated.js')


userRouter.post('/',userControler.registerUser)
userRouter.get('/login',userControler.authUser)
userRouter.get('/all-users-data',userControler.allUserData)

module.exports = userRouter