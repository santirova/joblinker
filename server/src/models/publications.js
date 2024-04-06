const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  userId: { type: String, required: true, ref: 'User' },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now }
})

const likeSchema = new mongoose.Schema({
  userId: { type: String, required: true, ref: 'User' }
})

const postSchema = new mongoose.Schema({
  text: { type: String, required: true },
  user: { type: mongoose.Types.ObjectId, ref: 'User' },
  photo: { type: String },
  likes: [likeSchema],
  comments: [commentSchema]
})

const Publication = mongoose.model('Publication', postSchema)

module.exports = Publication
