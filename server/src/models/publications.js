const mongoose = require('mongoose')

// const commentSchema = new mongoose.Schema({
//   text: { type: String, required: true },
//   user: { type: mongoose.Types.ObjectId, ref: 'User' },
//   date: { type: Date, default: Date.now }
// })

// const likeSchema = new mongoose.Schema({
//   userId: { type: String, required: true, ref: 'User' }
// })

const postSchema = new mongoose.Schema({
    text: { type: String, required: true },
    user: { type: mongoose.Types.ObjectId, ref: 'User' },
    photo: { type: String },
    likes: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    comments: [{ type: mongoose.Types.ObjectId, ref: 'Comment' }]
})

const Publication = mongoose.model('Publication', postSchema)
// const Comment = mongoose.model('Comment', commentSchema)

module.exports = { Publication }
