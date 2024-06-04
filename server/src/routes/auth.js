const { Router } = require('express')
const { postUserHandler, loginHandler, forgotPasswordHandler, resetPasswordHandler, getUserInfoHandler, logoutHandler, validateTokenHandler } = require('../handlers/authHandlers')

const authRouter = Router()

authRouter.post('/register', postUserHandler)
authRouter.post('/login', loginHandler)
// authRouter.post('/logout', logoutHandler)
authRouter.get('/forgot', forgotPasswordHandler)
authRouter.put('/reset', resetPasswordHandler)
authRouter.get('/userinfo/:id',getUserInfoHandler )
authRouter.get('/validate', validateTokenHandler )

module.exports = authRouter
