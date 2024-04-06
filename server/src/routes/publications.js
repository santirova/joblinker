const { Router } = require('express')
const { postPublicationHandler, deletePublicationHandler, updatePublicationHandler, getAllPublicationsHandler, postCommentHandler } = require('../handlers/publicationsHandlers')

const postRouter = Router()
postRouter.post('/', postPublicationHandler)
postRouter.delete('/:id', deletePublicationHandler)
postRouter.put('/:id', updatePublicationHandler)
postRouter.get('/', getAllPublicationsHandler)
postRouter.post('/comment/:userId', postCommentHandler)

module.exports = postRouter
