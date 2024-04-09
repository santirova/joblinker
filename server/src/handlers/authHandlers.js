const { postUserController, loginController } = require('../controllers/authControllers')

const postUserHandler = async (req, res) => {
    const { username, password, email, phone, photo } = req.body
    try {
        const newUser = await postUserController(username, password, email, phone, photo)
        // sendWelcomeEmail(email);
        res.status(200).send(newUser)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}

const loginHandler = async (req, res) => {
    try {
        const { email, password } = req.body
        const token = await loginController(email, password)
        res.status(200).send(token)
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
}

module.exports = { postUserHandler, loginHandler }
