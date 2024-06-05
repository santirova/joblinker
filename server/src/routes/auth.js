const { Router } = require('express')
const { postUserHandler, loginHandler, forgotPasswordHandler, resetPasswordHandler, getUserInfoHandler, logoutHandler, validateTokenHandler, updateUserHandler } = require('../handlers/authHandlers')
const upload = require('../configs/multer')

const authRouter = Router()
const privUserRouter = Router()
authRouter.post('/register',upload.single("image"), postUserHandler)
authRouter.post('/login', loginHandler)
authRouter.get('/validate', validateTokenHandler )
authRouter.get('/forgot', forgotPasswordHandler)
authRouter.put('/reset', resetPasswordHandler)

// authRouter.post('/logout', logoutHandler)
privUserRouter.get('/userinfo/:id',getUserInfoHandler )
privUserRouter.put('/update/:id', upload.single('image'), updateUserHandler )

module.exports = { authRouter, privUserRouter}
