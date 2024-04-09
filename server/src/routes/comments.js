const { Router } = require('express')
const { postCommentHandler } = require('../handlers/commentsHandlers')

const commentsRouter = Router()

commentsRouter.post('/:userId', postCommentHandler)

module.exports = commentsRouter
