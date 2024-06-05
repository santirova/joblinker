const { Router } = require('express')
const {authRouter, privUserRouter} = require('./auth')
const postRouter = require('./publications')
const commentsRouter = require('./comments')
const applicationsRouter = require('./applications')
const likeRouter = require('./likes')
const statsRouter = require('./stats')
const privRouter = Router()
const userRouter = Router()

userRouter.use('/auth', authRouter)
privRouter.use('/auth', privUserRouter)
privRouter.use('/post', postRouter)
privRouter.use('/comment', commentsRouter)
privRouter.use('/application', applicationsRouter)
privRouter.use('/like', likeRouter)
privRouter.use('/stats', statsRouter)

module.exports = { privRouter, userRouter}
