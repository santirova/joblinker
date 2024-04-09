const { Router } = require('express')
const { postUserHandler, loginHandler, forgotPasswordHandler, resetPasswordHandler } = require('../handlers/authHandlers')

const authRouter = Router()

authRouter.post('/register', postUserHandler)
authRouter.get('/login', loginHandler)
authRouter.get('/forgot', forgotPasswordHandler)
authRouter.put('/reset', resetPasswordHandler)

module.exports = authRouter
