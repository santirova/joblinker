const { postComment, deleteComment, updatedComment } = require('../controllers/commentsControllers')

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

const updateCommentHandler = async (req, res) => {
    try {
        const { userId } = req.params
        const { commentId, text } = req.body
        const updated = await updatedComment(userId, commentId, text)
        res.send(updated)
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
}
module.exports = { postCommentHandler, deleteCommentHandler, updateCommentHandler }
