const { postLike, deleteLike } = require("../controllers/likesController")

const postLikeHandler = async (req, res) => {
    try {
        const { userId } = req.params
        const { postId } = req.body
        const newLike = await postLike(userId, postId)
        res.send(newLike)
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
}

const deleteLikeHandler = async (req, res) => {
    try {
        const { userId } = req.params
        const { postId } = req.body
        const deleted = await deleteLike(userId, postId)
        res.send(deleted)
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
}
module.exports = {postLikeHandler,deleteLikeHandler}
