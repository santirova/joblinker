const getPublicIdFromImageUrl = (imageUrl) => {
    // Expresión regular para extraer el public ID de la URL
    const regex = /\/([^/]+)\.[^.]+$/;
    const match = imageUrl.match(regex);
  
    if (match && match[1]) {
      // El public ID se encuentra en el primer grupo capturado por la expresión regular
      const publicId = match[1];
      return publicId;
    }
  
    return null;
  };

  module.exports = {getPublicIdFromImageUrl}