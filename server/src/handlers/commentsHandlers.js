const { postComment, deleteComment } = require('../controllers/commentsControllers')

const postCommentHandler = async (req, res) => {
    try {
        const { userId } = req.params
        const { text, postId } = req.body
        const newComment = await postComment(userId, text, postId)
        res.send(newComment)
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
}

const deleteCommentHandler = async (req, res) => {
    try {
        const { userId } = req.params
        const { commentId } = req.body
        const deleted = await deleteComment(userId, commentId)
        res.send(deleted)
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
}

module.exports = { postCommentHandler, deleteCommentHandler }
