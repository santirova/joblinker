const { Router } = require('express')
const { postUserHandler, loginHandler, forgotPasswordHandler, resetPasswordHandler, getUserInfoHandler } = require('../handlers/authHandlers')

const authRouter = Router()

authRouter.post('/register', postUserHandler)
authRouter.post('/login', loginHandler)
authRouter.get('/forgot', forgotPasswordHandler)
authRouter.put('/reset', resetPasswordHandler)
authRouter.get('/userinfo/:id',getUserInfoHandler )

module.exports = authRouter
