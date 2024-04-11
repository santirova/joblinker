const { postApplication, updateApplication } = require('../controllers/applicationsControllers')

const postApplicationHandler = async (req, res) => {
    try {
        const { userId } = req.params
        const body = req.body
        body.user = userId
        const newApplication = await postApplication(body)
        res.send(newApplication)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}

const updateApplicationHandler = async (req, res) => {
    try {
        const { userId } = req.params
        const { applicationId } = req.body
        const { data } = req.body
        const updatedApplication = await updateApplication(userId, applicationId, data)
        res.send(updatedApplication)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}

const deleteApplicationHandler = async (req, res) => {
    try {
        res.send('aloha')
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}

const getApplicationsByUserHandler = async (req, res) => {
    try {
        res.send('aloha')
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}

module.exports = { getApplicationsByUserHandler, postApplicationHandler, deleteApplicationHandler, updateApplicationHandler }
