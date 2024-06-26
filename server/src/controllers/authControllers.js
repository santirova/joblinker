const { encrypt, compare } = require('../utils/bcrypt')
const { User } = require('../models/users')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const cloudinary = require('../configs/cloudinary')
const { getPublicIdFromImageUrl } = require('../utils/cloudinary')
const { SECRET_KEY } = process.env

const postUserController = async (username, password, email, phone, file) => {
    const hashPassword = await encrypt(password)
    const user =await User.findOne({ email })
    if (user) {
        throw new Error('El email ya ha sido registrado anteriormente')
        
    }
    let image;
    if(file){
        image = await cloudinary.uploader.upload(file.path)
    }
    const newUser = new User({
        image:image && image.secure_url,
        username,
        password: hashPassword,
        email,
        phone
    })
    await newUser.save()

    return newUser
}

const updateUserController = async (username, email, phone, file, _id) => {
    let image;
    const user = await User.findOne({ _id })
    if (!user) {
        throw new Error('User not found')
    }
    let updated = await User.findOneAndUpdate(
        { _id },
        { username, email, phone },
        { new: true, select: '-password' }
    )
    if (file) {
        image = await cloudinary.uploader.upload(file.path);
        if (user.image && user.image.includes('cloudinary.com')){
            const publicId = getPublicIdFromImageUrl(user.image);
            await cloudinary.uploader.destroy(publicId);
        }
        const updatedWhitImage = await User.findOneAndUpdate(
            { _id },
            { image: image.secure_url},
            { new: true, select: '-password' } 
        )
        updated = updatedWhitImage
    }
    return updated
}

const loginController = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Invalid email')
    }

    const checkPassword = await compare(password, user.password)

    if (checkPassword) {
        const token = jwt.sign({ userId: user.id, email: user.email }, SECRET_KEY, {
            expiresIn: '24h'
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
    if (!token) {
        return { message :'no hay token'}
      }
    
    const decoded =  jwt.verify(token, SECRET_KEY);
    return { message: 'Token válido', user: decoded }
}
module.exports = { postUserController, loginController, forgotPasswordController, resetPassword, getUserInfo, validateTokenController, updateUserController }
