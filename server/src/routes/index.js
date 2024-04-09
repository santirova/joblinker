const { Router } = require('express')
const authRouter = require('./auth')
const postRouter = require('./publications')
const commentsRouter = require('./comments')
const router = Router()

router.use('/auth', authRouter)
router.use('/post', postRouter)
router.use('/comment', commentsRouter)

module.exports = router
