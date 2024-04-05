const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: Number
  },
  photo: {
    type: String
  },
  creatAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('User', userSchema)
