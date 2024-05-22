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
        console.log(postId);
        const deleted = await deleteLike(userId, postId)
        // console.log(deleted);
        res.send(deleted)
    } catch (error) {
        console.log(error.message);
        res.status(400).send({ error: error.message })
    }
}
module.exports = {postLikeHandler,deleteLikeHandler}
