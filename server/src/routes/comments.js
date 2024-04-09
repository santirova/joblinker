const { Router } = require('express')
const { postCommentHandler, deleteCommentHandler } = require('../handlers/commentsHandlers')

const commentsRouter = Router()

commentsRouter.post('/:userId', postCommentHandler)
commentsRouter.delete('/:userId', deleteCommentHandler)

module.exports = commentsRouter
