const { postUserController, loginController, forgotPasswordController, resetPassword } = require('../controllers/authControllers')
const { sendPasswordResetEmail, sendWelcomeEmail } = require('../utils/nodemailer')

const postUserHandler = async (req, res) => {
    const { username, password, email, phone, photo } = req.body
    try {
        const newUser = await postUserController(username, password, email, phone, photo)
        sendWelcomeEmail(email)
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

const forgotPasswordHandler = async (req, res) => {
    try {
        const { email } = req.body
        console.log(email)
        const token = await forgotPasswordController(email)
        sendPasswordResetEmail(email, token)
        res.status(200).send('Email sent successfully')
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
}

const resetPasswordHandler = async (req, res) => {
    try {
        const { newPassword, token } = req.body
        const response = await resetPassword(newPassword, token)
        res.status(200).send(response)
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
}
module.exports = { postUserHandler, loginHandler, forgotPasswordHandler, resetPasswordHandler }
