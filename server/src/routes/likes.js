const {Router} = require('express')
const { postLikeHandler, deleteLikeHandler } = require('../handlers/likeHandlers')

const likeRouter = Router()

likeRouter.post('/:userId', postLikeHandler)
likeRouter.delete('/:userId', deleteLikeHandler)


module.exports = likeRouter