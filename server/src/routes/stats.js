const {Router} = require('express')
const { getStatsBoxsHandler, getStatsBarHandler, getStatsPieHandler, getStatsLineHandler } = require('../handlers/statsHandler')

const statsRouter = Router()

statsRouter.get('/statsbox/:userId',getStatsBoxsHandler)
statsRouter.get('/statsbar/:userId',getStatsBarHandler)
statsRouter.get('/statspie/:userId',getStatsPieHandler)
statsRouter.get('/statsline/:userId',getStatsLineHandler)



module.exports = statsRouter