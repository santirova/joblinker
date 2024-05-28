const { getStatsBoxs, getStatsBar, getStatsPie, getStatsLine } = require("../controllers/statsControllers")



const getStatsBoxsHandler = async (req, res) => {
    try {
        const { userId } = req.params
        const stats = await getStatsBoxs(userId)
        res.status(200).send(stats)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}
const getStatsBarHandler = async (req,res) =>{
    try {
        const { userId } = req.params
        const stats = await getStatsBar(userId)
        res.status(200).send(stats)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}

const getStatsPieHandler = async (req,res) =>{
    try {
        const { userId } = req.params
        const stats = await getStatsPie(userId)
        res.status(200).send(stats)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}

const getStatsLineHandler = async (req,res) =>{
    try {
        const { userId } = req.params
        const stats = await getStatsLine(userId)
        res.status(200).send(stats)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}
module.exports = { getStatsBoxsHandler, getStatsBarHandler, getStatsPieHandler, getStatsLineHandler}