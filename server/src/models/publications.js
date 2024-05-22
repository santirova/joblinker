const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    text: { type: String, required: true },
    user: { type: mongoose.Types.ObjectId, ref: 'User' },
    image: { type: String },
    likes: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    comments: [{ type: mongoose.Types.ObjectId, ref: 'Comment' }],
    },
    {timestamps:true}
)

const Publication = mongoose.model('Publication', postSchema)

module.exports = { Publication }
