import { Box, Button, Divider, IconButton, TextField, Typography } from "@mui/material";
import { AddCircleOutline as AddCommentIcon, ChatBubbleOutline as CommentIcon, FavoriteBorderOutlined as FavoriteIcon } from "@mui/icons-material";
import { useState } from "react";

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

  return (
    <Box bgcolor="white" padding={2} marginBottom={2}>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
        <Box>
          <Typography variant="h6" gutterBottom>
            {publication.text}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Publicado por: {publication.user?.username}
          </Typography>
        </Box>
        <IconButton aria-label="Like">
          <FavoriteIcon />
        </IconButton>
      </Box>
      {publication.image && (
        <Box mb={2}>
          <img src={publication.image} alt="Publicación" style={{ maxWidth: "100%", borderRadius: "8px" }} />
        </Box>
      )}
      <Divider />
      {commentsVisible && (
        <Box mt={2}>
          <Typography variant="h6" gutterBottom>Comentarios:</Typography>
          {publication?.comments.map((comment) => (
            <Box key={comment._id} ml={2} mb={1}>
              <Typography variant="body2">{comment.text}</Typography>
              <Typography variant="caption">Comentado por: {comment.user.username}</Typography>
            </Box>
          ))}
        </Box>
      )}
      <Box display="flex" alignItems="center" mt={2}>
        <Button
          startIcon={<CommentIcon />}
          onClick={toggleCommentsVisibility}
          color={commentsVisible ? "secondary" : "primary"}
          size="small"
        >
          {commentsVisible ? "Ocultar comentarios" : "Ver comentarios"}
        </Button>
        <IconButton aria-label="Agregar comentario">
          <AddCommentIcon />
        </IconButton>
      </Box>
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
