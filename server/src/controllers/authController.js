const { encrypt } = require("../utils/bcrypt")
const User = require('../models/users')

const postUserController = async (user,password,email,phone) =>{
    const hashPassword = await encrypt(password)
    const newUser = new User({
        user,
        password:hashPassword,
        email,
        phone,
    })
    await newUser.save()
    newUser.toObject({
        transform: function (doc, ret) {
            delete ret.password;
        }
    });
    return newUser
}


module.exports = {postUserController}