import { Box, Grid, IconButton, TextField } from "@mui/material";
import { Delete, AddPhotoAlternate } from "@mui/icons-material";
import { useState } from "react";
import Avatar from '@mui/material/Avatar';
import { useSelector, useDispatch } from "react-redux";
import { postPublication } from "../redux/actions/publicationsAcction";
import ButtonLoading from "./buttonLoading";

export default function CreatePublication() {
  const [newPostText, setNewPostText] = useState("");
  const [image, setImage] = useState(null);
  const { postLoading } = useSelector(state => state.publications)
  const { userInfo } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleCreatePost = async () => {
    try {
      const formData = new FormData();
      formData.append('user', userInfo._id);
      formData.append('text', newPostText);
      if (image) {
        formData.append('image', image);
      }
      await dispatch(postPublication(formData)).unwrap();
      setNewPostText("");
      setImage(null);
    } catch (error) {
      console.error("Error al crear la publicación:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleDeleteImage = () => {
    setImage(null);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" padding={2} border={1} borderColor="grey.300" borderRadius={2} boxShadow={2} bgcolor="white">
      <Grid container spacing={2} alignItems="start">
        <Grid item>
          {userInfo?.photo ? (
            <Avatar src={userInfo.photo}  />
          ) : (
            <Avatar >
              {userInfo?.username.charAt(0).toUpperCase()}
            </Avatar>
          )}
        </Grid>
        <Grid item xs>
          <Box display="flex" flexDirection="column" alignItems="start">
            <TextField
              label="¿Qué estás pensando?"
              variant="outlined"
              fullWidth
              value={newPostText}
              onChange={(e) => setNewPostText(e.target.value)}
              multiline
            />
          </Box>
        </Grid>
      </Grid>
      {image && (
        <Box mt={2} position="relative">
          <img src={URL.createObjectURL(image)} alt="Imagen adjunta" style={{ maxWidth: "100%", maxHeight: 200, borderRadius: 4 }} />
          <IconButton color="error" aria-label="Eliminar imagen" onClick={handleDeleteImage} size="small" sx={{ position: 'absolute', top: 0, right: 0, zIndex: 1 }}>
            <Delete />
          </IconButton>
        </Box>
      )}
      <Box mt={2} display="flex" alignItems="center" justifyContent="space-between" width="100%">
        <input
          accept=".jpg,.jpeg,.png"
          style={{ display: "none" }}
          id="contained-button-file"
          type="file"
          onChange={handleImageChange}
        />
        <label htmlFor="contained-button-file">
          <IconButton color="primary" aria-label="Adjuntar imagen" component="span">
            <AddPhotoAlternate />
          </IconButton>
        </label>
        <ButtonLoading onClick={handleCreatePost} disabled= {newPostText === "" || postLoading} loading={postLoading} text="Publicar"/>
      </Box>
    </Box>
  );
}
