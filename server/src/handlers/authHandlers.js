const { postUserController, loginController } = require('../controllers/authController')

const postUserHandler = async (req, res) => {
  const { user, password, email, phone, photo } = req.body
  try {
    const newUser = await postUserController(user, password, email, phone, photo)
    // sendWelcomeEmail(email);
    res.status(200).send(newUser)
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).send({ error: 'El correo electrónico ya está en uso.' })
    } else {
      res.status(500).send({ error: error.message })
    }
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
