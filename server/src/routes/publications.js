const { Router } = require('express')
const { postPublicationHandler, deletePublicationHandler, updatePublicationHandler, getAllPublicationsHandler } = require('../handlers/publicationsHandlers')
const upload = require('../configs/multer')

const postRouter = Router()
postRouter.post('/', upload.single('image'), postPublicationHandler)
postRouter.delete('/:id', deletePublicationHandler)
postRouter.put('/:id', updatePublicationHandler)
postRouter.get('/', getAllPublicationsHandler)

module.exports = postRouter
