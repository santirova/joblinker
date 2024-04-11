const { Router } = require('express')
const { postApplicationHandler, updateApplicationHandler, deleteApplicationHandler, getApplicationsByUserHandler } = require('../handlers/applicationsHandlers')

const applicationsRouter = Router()

applicationsRouter.post('/:userId', postApplicationHandler)
applicationsRouter.put('/:userId', updateApplicationHandler)
applicationsRouter.delete('/:userId', deleteApplicationHandler)
applicationsRouter.get('/:userId', getApplicationsByUserHandler)

module.exports = applicationsRouter
