const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  user: { type: mongoose.Types.ObjectId, ref: 'User' },
  date: { type: Date, default: Date.now }
})

const Comment = mongoose.model('Comment', commentSchema)
module.exports = { Comment }
