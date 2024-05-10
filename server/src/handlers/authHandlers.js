const { postUserController, loginController, forgotPasswordController, resetPassword, getUserInfo } = require('../controllers/authControllers')
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
        const { token, user} = await loginController(email, password)
        res.status(200).send({user,token})
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

const getUserInfoHandler = async (req, res) => {
    try {
        const { id } = req.params
        const userInfo = await getUserInfo(id);
        res.status(200).send(userInfo)
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
}

// const logoutHandler = async (req, res) => {
//     try {
//         res.cookie("token", 'none', {
//             expires: new Date(Date.now() + 5 * 1000),
//             httpOnly: true,
//         })
//         res
//             .status(200)
//             .json({ success: true, message: 'User logged out successfully' })
//     } catch (error) {
//         res.status(500).send({ error: "Error al cerrar sesión" });
//     }
// }
module.exports = { postUserHandler, loginHandler, forgotPasswordHandler, resetPasswordHandler, getUserInfoHandler }
