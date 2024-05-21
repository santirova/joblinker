const { Comment } = require('../models/comments')
const { Publication } = require('../models/publications')
const { User } = require('../models/users')

const postComment = async (user, text, postId) => {
    const newComment = new Comment({ text, user, postId })
    const savedComment = await newComment.save()
    await Publication.findByIdAndUpdate(postId, { $push: { comments: savedComment._id } })
    const comment = await Comment
        .findById(savedComment._id)
        .populate({
            path: 'user',
            model: User,
            select: '_id, username'
        })
    return comment
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
        await Comment.findByIdAndDelete(commentId)
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
        const updatedComment = await Comment.findByIdAndUpdate(commentId, { text }, { returnDocument: 'after' })
        return updatedComment
    } else {
        return 'Wrong user, user must be the creator of the comment'
    }
}
module.exports = { postComment, deleteComment, updatedComment }
