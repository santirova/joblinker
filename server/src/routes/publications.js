const { Router } = require('express')
const { postPublicationHandler, deletePublicationHandler, updatePublicationHandler, getAllPublicationsHandler } = require('../handlers/publicationsHandlers')

const postRouter = Router()
postRouter.post('/', postPublicationHandler)
postRouter.delete('/:id', deletePublicationHandler)
postRouter.put('/:id', updatePublicationHandler)
postRouter.get('/', getAllPublicationsHandler)

module.exports = postRouter
