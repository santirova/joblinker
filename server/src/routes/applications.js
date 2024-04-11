const { Router } = require('express')
const { postApplicationHandler, updateApplicationHandler } = require('../handlers/applicationsHandlers')

const applicationsRouter = Router()

applicationsRouter.post('/:userId', postApplicationHandler)
applicationsRouter.put('/:userId', updateApplicationHandler)

module.exports = applicationsRouter
