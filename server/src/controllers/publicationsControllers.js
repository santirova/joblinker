const { Publication } = require('../models/publications')
const { User } = require('../models/users')
const { Comment } = require('../models/comments')

const postPublication = async (user, text) => {
  const newPost = new Publication({
    user,
    text
  })
  await newPost.save()

  return newPost
}

const deletePublication = async (postId) => {
  await Publication.deleteOne({ _id: postId })
  return 'successfully removed'
}

const updatePublication = async (_id, text) => {
  const updated = await Publication.findOneAndUpdate(
    { _id },
    { text },
    { new: true }
  )
  return updated
}

const getAllPublications = async () => {
  const publications = await Publication
    .find()
    .populate({
      path: 'comments',
      populate: {
        path: 'user', // <- campo del comentario que deseamos poblar
        select: 'username',
        model: User // <- campos que deseo traer de la colección de usuarios
      },
      model: Comment,
      select: 'text '
    })
  return publications
}

module.exports = { postPublication, deletePublication, updatePublication, getAllPublications }
