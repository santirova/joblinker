const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  user: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const likeSchema = new mongoose.Schema({
  user: { type: String, required: true }
});

const postSchema = new mongoose.Schema({
  text: { type: String, required: true },
  photo: { type: String }, 
  likes: [likeSchema], 
  comments: [commentSchema]
});

const Publication = mongoose.model('Publication', postSchema);

module.exports = Publication;
