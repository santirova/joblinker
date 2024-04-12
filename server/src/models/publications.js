const mongoose = require('mongoose')

// const likeSchema = new mongoose.Schema({
//   userId: { type: String, required: true, ref: 'User' }
// })

const postSchema = new mongoose.Schema({
    text: { type: String, required: true },
    user: { type: mongoose.Types.ObjectId, ref: 'User' },
    image: { type: String },
    likes: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    comments: [{ type: mongoose.Types.ObjectId, ref: 'Comment' }]
})

const Publication = mongoose.model('Publication', postSchema)

module.exports = { Publication }
