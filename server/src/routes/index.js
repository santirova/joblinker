const { Router } = require('express')
const authRouter = require('./auth')
const postRouter = require('./publications')
const commentsRouter = require('./comments')
const applicationsRouter = require('./applications')
const likeRouter = require('./likes')
const router = Router()

router.use('/auth', authRouter)
router.use('/post', postRouter)
router.use('/comment', commentsRouter)
router.use('/application', applicationsRouter)
router.use('/like', likeRouter)

module.exports = router
