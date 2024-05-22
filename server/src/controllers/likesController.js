const { Publication } = require('../models/publications')


const postLike = async (userId, postId) => {
    const publication = await Publication.findById(postId);
        
    if (!publication) {
        throw new Error('Publicación no encontrada');
    }

    // Verifica si el userId ya está en la lista de likes
    if (publication.likes.includes(userId)) {
        return "Ya has dado like a esta publicación.";
    }

    // Si el userId no está en la lista, agrega el like
    publication.likes.push(userId);
    await publication.save();

    return {
        message:"¡Like añadido!",
        userId
    }
}

const deleteLike = async (userId, postId) => {
    console.log(userId,postId);
    const publi = await Publication.findByIdAndUpdate(postId, { $pull: { likes: userId } });
    return {
        message:"¡Like eliminado!",
        userId,
        likes:publi?.likes
    }
}
module.exports = { postLike, deleteLike}