const { encrypt, compare } = require('../utils/bcrypt')
const User = require('../models/users')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const secretKey = process.env.SECRET_KEY

const postUserController = async (user, password, email, phone) => {
  const hashPassword = await encrypt(password)
  const newUser = new User({
    user,
    password: hashPassword,
    email,
    phone
  })
  await newUser.save()

  newUser.toObject({
    transform: function (doc, ret) {
      delete ret.password
    }
  })

  return newUser
}

const loginController = async (email, password) => {
  const user = await User.findOne({ email })

  if (!user) {
    return 'Usuario invalido'
  }

  const checkPassword = await compare(password, user.password)

  if (checkPassword) {
    const token = jwt.sign({ userId: user.id, email: user.email }, secretKey, {
      expiresIn: '1h'
    })
    return {
      token,
      user
    }
  }

  if (!checkPassword) {
    return {
      error: 'Contraseña incorrecta'
    }
  }
}

module.exports = { postUserController, loginController }
