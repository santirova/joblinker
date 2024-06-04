const { encrypt, compare } = require('../utils/bcrypt')
const { User } = require('../models/users')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { SECRET_KEY } = process.env

const postUserController = async (username, password, email, phone) => {
    const hashPassword = await encrypt(password)
    const user =await User.findOne({ email })
    if (user) {
        throw new Error('El email ya ha sido registrado anteriormente')
        
    }
    const newUser = new User({
        username,
        password: hashPassword,
        email,
        phone
    })
    await newUser.save()

    return newUser
}

const loginController = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Invalid email')
    }

    const checkPassword = await compare(password, user.password)

    if (checkPassword) {
        const token = jwt.sign({ userId: user.id, email: user.email }, SECRET_KEY, {
            expiresIn: '1h'
        })
        return {
            token,
            user
        }
    }

    if (!checkPassword) {
        throw new Error('Invalid password')
    }
}

const forgotPasswordController = async (email) => {
    const user = await User.findOne({ email })
    console.log(user)
    if (!user) {
        throw new Error('No user found with this email address.')
    }
    const token = jwt.sign({ userId: user._id, email }, SECRET_KEY, { expiresIn: '1h' })
    return token
}

const resetPassword = async (newPassword, token) => {
    const decodedToken = jwt.verify(token, SECRET_KEY)
    const user = await User.findOne({ _id: decodedToken.userId })

    if (!user) {
        throw new Error('User not found')
    }

    const hashPassword = await encrypt(newPassword)
    await User.findByIdAndUpdate(user._id, { password: hashPassword })
    return { message: 'Password reset successful.' }
}

const getUserInfo = async (id) => {
    const user = await User.findById(id)
    return user
}

const validateTokenController = async (token) =>{
    console.log('en controller');
    console.log(token);
    if (!token) {
        console.log('no hay token');
        return { message :'no hay token'}
      }
    
    const decoded =  jwt.verify(token, SECRET_KEY);
    return { message: 'Token válido', user: decoded }
}
module.exports = { postUserController, loginController, forgotPasswordController, resetPassword, getUserInfo, validateTokenController }
