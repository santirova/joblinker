import { Box, Button, IconButton, TextField, Typography, Avatar, Divider } from "@mui/material";
import { ChatBubbleOutline as CommentIcon, FavoriteBorderOutlined as FavoriteIcon } from "@mui/icons-material";
import { useState } from "react";
import { format } from "date-fns";

const Publication = ({ publication }) => {
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [commentText, setCommentText] = useState("");

  const toggleCommentsVisibility = () => {
    setCommentsVisible(!commentsVisible);
  };

  const handleCommentSubmit = () => {
    // Aquí iría la lógica para enviar el comentario al backend
    console.log("Comentario enviado:", commentText);
    // Limpia el campo de texto después de enviar el comentario
    setCommentText("");
  };

  const formattedDate = format(new Date(publication.createdAt), "dd/MM/yyyy HH:mm");

  return (
    <Box bgcolor="whitesmoke" padding={2} marginY={2} borderRadius={2} border={1} borderColor="grey.300" boxShadow={2}>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
        <Box display="flex" >
          <Avatar
            src={publication.user?.photoUrl}
            alt={publication.user?.username}
            sx={{ width: 32, height: 32, fontSize: 16, mr:0 }}
          >
            {!publication.user?.photoUrl && publication.user?.username?.[0]}
          </Avatar>
          <Box ml={1}>
            <Typography variant="h6" gutterBottom>
              {publication.user?.username}
            </Typography>
          </Box>
        </Box>
        <Typography variant="caption" color="textSecondary">
          {formattedDate}
        </Typography>
      </Box>
      <Divider/>
      <Typography variant="body1" my={2}>
        {publication.text}
      </Typography>
      {publication.image && (
        <Box mb={2} style={{ textAlign: "center" }}>
        <img
          src={publication.image}
          alt="Publicación"
          style={{
            width: "300px", // Establecer el ancho al 100%
            height: "300px", // Mantener la proporción original de la imagen
            borderRadius: "8px",
            objectFit: "cover", // Ajustar la imagen para cubrir el contenedor sin deformarse
            cursor:"pointer"
          }}
        />
      </Box>
      )}
      <Box display="flex" alignItems="center" mt={2}>
        <IconButton size="small" onClick={toggleCommentsVisibility}>
          <CommentIcon />
        </IconButton>
        <IconButton aria-label="Like" size="small">
          <FavoriteIcon />
        </IconButton>
      </Box>
      {commentsVisible && (
        <Box mt={2}>
          {publication?.comments.map((comment) => (
            <Box key={comment._id} ml={2} mb={1}>
              <Typography variant="h6">{comment.user?.username}</Typography>
              <Typography variant="body2">{comment.text}</Typography>
            </Box>
          ))}
        </Box>
      )}
      {commentsVisible && (
        <Box mt={2}>
          <TextField
            label="Escribe tu comentario"
            variant="outlined"
            fullWidth
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <Box mt={1} textAlign="right">
            <Button
              variant="contained"
              color="primary"
              onClick={handleCommentSubmit}
              disabled={!commentText.trim()}
            >
              Enviar comentario
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Publication;
