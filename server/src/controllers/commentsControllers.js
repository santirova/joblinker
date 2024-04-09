const { Comment } = require('../models/comments')
const { Publication } = require('../models/publications')
const { User } = require('../models/users')

const postComment = async (user, text, postId) => {
    const newComment = new Comment({ text, user, postId })
    const savedComment = await newComment.save()
    await Publication.findByIdAndUpdate(postId, { $push: { comments: savedComment._id } })
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
    if (comment.user._id.toString() === userId) {
        await Comment.deleteOne({ _id: commentId })
        return 'successfully deleted'
    } else {
        return 'Wrong user, user must be the creator of the comment'
    }
}

const updatedComment = async (userId, commentId, text) => {
    const comment = await Comment
        .findOne({ _id: commentId })
        .populate({
            path: 'user',
            model: User,
            select: '_id'
        })
    if (comment.user._id.toString() === userId) {
        await Comment.updateOne({ _id: commentId }, { text })
        return 'Successfully updated'
    } else {
        return 'Wrong user, user must be the creator of the comment'
    }
}
module.exports = { postComment, deleteComment, updatedComment }
