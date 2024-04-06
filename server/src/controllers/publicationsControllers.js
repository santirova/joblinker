const { Publication, Comment } = require('../models/publications')
const { User } = require('../models/users')

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

const postComment = async (user, text, postId) => {
  const newComment = new Comment({ text, user, postId })
  const savedComment = await newComment.save()
  const comentedPost = await Publication.findByIdAndUpdate(postId, { $push: { comments: savedComment._id } })
  console.log(comentedPost)
  return savedComment
}
module.exports = { postPublication, deletePublication, updatePublication, getAllPublications, postComment }
