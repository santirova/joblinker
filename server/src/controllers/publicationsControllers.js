const Publication = require('../models/publications')

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

module.exports = { postPublication, deletePublication }
