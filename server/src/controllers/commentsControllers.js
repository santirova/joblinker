const { Comment } = require('../models/comments')
const { Publication } = require('../models/publications')
const { User } = require('../models/users')

const postComment = async (user, text, postId) => {
    const newComment = new Comment({ text, user, postId })
    const savedComment = await newComment.save()
    const comentedPost = await Publication.findByIdAndUpdate(postId, { $push: { comments: savedComment._id } })
    console.log(comentedPost)
    return savedComment
}

const deleteComment = async (userId, commentId) => {
    const comment = await Comment
        .findOne({ _id: commentId })
        .populate({
            path: 'user',
            model: User,
            select: '_id'
        })
    console.log(comment)
    if (comment.user._id.toString() === userId) {
        await Comment.deleteOne({ _id: commentId })
        return 'successfully deleted'
    } else {
        return comment
    }
}

module.exports = { postComment, deleteComment }
