const { postPublication, deletePublication, updatePublication, getAllPublications, postComment } = require('../controllers/publicationsControllers')

const postPublicationHandler = async (req, res) => {
  try {
    const { user, text } = req.body
    const newPost = await postPublication(user, text)
    res.send(newPost)
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
}

const deletePublicationHandler = async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await deletePublication(id)
    res.send(deleted)
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
}
const updatePublicationHandler = async (req, res) => {
  try {
    const { id } = req.params
    const { text } = req.body
    const updated = await updatePublication(id, text)
    res.send(updated)
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
}
const getAllPublicationsHandler = async (req, res) => {
  try {
    const publications = await getAllPublications()
    res.send(publications)
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
}
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

module.exports = {
  postPublicationHandler,
  deletePublicationHandler,
  getAllPublicationsHandler,
  updatePublicationHandler,
  postCommentHandler
}
