const { Router } = require('express')
const { postPublicationHandler, deletePublicationHandler } = require('../handlers/publicationsHandlers')

const postRouter = Router()
postRouter.post('/', postPublicationHandler)
postRouter.delete('/:id', deletePublicationHandler)

module.exports = postRouter
