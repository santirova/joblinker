const { Router } = require('express')
const authRouter = require('./auth')
const postRouter = require('./publications')
const router = Router()

router.use('/auth', authRouter)
router.use('/post', postRouter)

module.exports = router
