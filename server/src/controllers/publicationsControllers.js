const { Publication } = require('../models/publications')
const { User } = require('../models/users')
const { Comment } = require('../models/comments')
const cloudinary = require('../configs/cloudinary')
const postPublication = async (user, text, file) => {
    let image

    if (file) {
        image = await cloudinary.uploader.upload(file.path)
    }

    const newPost = new Publication({
        image: image && image.secure_url,
        user,
        text
    })

    await newPost.save()

    // Poblar la publicación recién creada con información de comentarios y usuarios de comentarios
    const populatedPost = await Publication.findById(newPost._id)
    .populate({
        path: 'user', // <- campo del usuario que deseamos poblar
        select: 'username', // <- campos que deseamos traer del usuario
        model: User
    })

    return populatedPost;
}
const deletePublication = async (postId) => {
    await Publication.deleteOne({ _id: postId })
    return 'successfully deleted'
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
        .sort({ createdAt: "desc" })
        .populate({
            path: 'user', // <- campo del usuario que deseamos poblar
            select: 'username image', // <- campos que deseamos traer del usuario
            model: User
        })
        .populate({
            path: 'comments',
            populate: {
                path: 'user', // <- campo del comentario que deseamos poblar
                select: 'username',
                model: User // <- campos que deseo traer de la colección de usuarios
            },
            model: Comment,
            select: 'text '
        },

    )
    return publications
}

module.exports = { postPublication, deletePublication, updatePublication, getAllPublications }
