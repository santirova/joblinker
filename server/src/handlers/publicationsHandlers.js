const { postPublication, deletePublication } = require('../controllers/publicationsControllers')

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
    res.send('hola')
  } catch (error) {
    res.send('hola')
  }
}
const getAllPublicationsHandler = async (req, res) => {
  try {
    res.send('hola')
  } catch (error) {
    res.send('hola')
  }
}

module.exports = {
  postPublicationHandler,
  deletePublicationHandler,
  getAllPublicationsHandler,
  updatePublicationHandler
}
