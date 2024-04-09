const { Router } = require('express')
const { postCommentHandler, deleteCommentHandler, updateCommentHandler } = require('../handlers/commentsHandlers')

const commentsRouter = Router()

commentsRouter.post('/:userId', postCommentHandler)
commentsRouter.delete('/:userId', deleteCommentHandler)
commentsRouter.put('/:userId', updateCommentHandler)

module.exports = commentsRouter
