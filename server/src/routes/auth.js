const { Router } = require('express')
const { postUserHandler, loginHandler, forgotPasswordHandler, resetPasswordHandler, getUserInfoHandler, logoutHandler, validateTokenHandler, updateUserHandler } = require('../handlers/authHandlers')
const upload = require('../configs/multer')

const authRouter = Router()

authRouter.post('/register',upload.single("image"), postUserHandler)
authRouter.post('/login', loginHandler)
// authRouter.post('/logout', logoutHandler)
authRouter.get('/forgot', forgotPasswordHandler)
authRouter.put('/reset', resetPasswordHandler)
authRouter.get('/userinfo/:id',getUserInfoHandler )
authRouter.get('/validate', validateTokenHandler )
authRouter.put('/update/:id', upload.single('image'), updateUserHandler )

module.exports = authRouter
