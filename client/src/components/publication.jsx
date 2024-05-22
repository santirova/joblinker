import { Box, Button, IconButton, TextField, Typography, Avatar, Divider, Modal } from "@mui/material";
import { ChatBubbleOutline as CommentIcon, FavoriteBorderOutlined as FavoriteIcon, Close as CloseIcon } from "@mui/icons-material";
import { useState } from "react";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { commentPublication } from "../redux/actions/publicationsAcction";

const Publication = ({ publication }) => {
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const _id = useSelector(state => state.user.userInfo?._id);
  const dispatch = useDispatch();

  const toggleCommentsVisibility = () => {
    setCommentsVisible(!commentsVisible);
  };

  const handleCommentSubmit = async () => {
    const data = {
      userId: _id,
      text: commentText,
      postId: publication?._id,
    };
    await dispatch(commentPublication(data)).unwrap();
    setCommentText("");
  };

  const formattedDate = format(new Date(publication.createdAt), "dd/MM/yyyy");

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  return (
    <Box bgcolor="whitesmoke" padding={2} marginY={2} borderRadius={2} border={1} borderColor="grey.300" boxShadow={2} overflow="hidden">
      <Box display="flex" flexDirection="column">
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
          <Box display="flex" flexShrink={0}>
            <Avatar
              src={publication.user?.photoUrl}
              alt={publication.user?.username}
              sx={{ width: 32, height: 32, fontSize: 16, mr: 0 }}
            >
              {!publication.user?.photoUrl && publication.user?.username?.[0].toUpperCase()}
            </Avatar>
            <Box ml={1}>
              <Typography variant="subtitle1" gutterBottom noWrap>
                {publication.user?.username}
              </Typography>
            </Box>
          </Box>
          <Typography variant="caption" color="textSecondary">
            {formattedDate}
          </Typography>
        </Box>
        <Divider />
        <Typography variant="body1" my={2}>
          {publication.text}
        </Typography>
        {publication.image && (
          <Box mb={2} textAlign="center">
            <img
              src={publication.image}
              alt="Publicación"
              style={{
                width: "60%",
                height: "200px", // Establece una altura fija para todas las imágenes
                borderRadius: "8px",
                objectFit: "cover",
                cursor: "pointer",
                maxWidth: "100%",
              }}
              onClick={handleModalOpen}
            />
          </Box>
        )}
        <Box display="flex" alignItems="center" mt={2}>
          <IconButton size="small" onClick={toggleCommentsVisibility}>
            <CommentIcon />
          </IconButton>
          <Typography variant="body2" ml={1}>
            {publication.comments.length}
          </Typography>
          <IconButton aria-label="Like" size="small">
            <FavoriteIcon />
          </IconButton>
          <Typography variant="body2" ml={1}>
            {publication.likes.length}
          </Typography>
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
      <Modal open={modalOpen} onClose={handleModalClose}>
        <Box 
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
          bgcolor="rgba(0, 0, 0, 0.8)"
        >
          <Box position="relative" display="inline-block" p={1} bgcolor="white" borderRadius={2}>
            <IconButton 
              onClick={handleModalClose} 
              sx={{ position: 'absolute', top: 8, right: 8, color: 'black' }}
            >
              <CloseIcon />
            </IconButton>
            <img
              src={publication.image}
              alt="Publicación"
              style={{
                maxWidth: "90vw",
                maxHeight: "90vh",
                borderRadius: "8px",
                objectFit: "contain",
              }}
            />
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Publication;
