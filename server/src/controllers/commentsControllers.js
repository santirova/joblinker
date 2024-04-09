const { Comment } = require('../models/comments')
const { Publication } = require('../models/publications')

const postComment = async (user, text, postId) => {
  const newComment = new Comment({ text, user, postId })
  const savedComment = await newComment.save()
  const comentedPost = await Publication.findByIdAndUpdate(postId, { $push: { comments: savedComment._id } })
  console.log(comentedPost)
  return savedComment
}

module.exports = { postComment }
