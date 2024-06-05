import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Box, Avatar, IconButton } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Delete } from "@mui/icons-material";
import { updateUserInfo } from '../redux/actions/userActions';
import ButtonLoading from "./buttonLoading";

export default function EditProfileDialog({ open, onClose, user }) {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.user)
  const [formData, setFormData] = useState({
    username: user?.username,
    email: user?.email,
    phone: user?.phone,
    image: user?.image,
    imageFile: null,
  });

  const [initialData, setInitialData] = useState({
    username: user?.username,
    email: user?.email,
    phone: user?.phone,
    image: user?.image,
  });

  useEffect(() => {
    setInitialData({
      username: user?.username,
      email: user?.email,
      phone: user?.phone,
      image: user?.image,
    });
    setFormData({
      username: user?.username,
      email: user?.email,
      phone: user?.phone,
      image: user?.image,
      imageFile: null,
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      const file = files[0];
      setFormData({
        ...formData,
        image: URL.createObjectURL(file),
        imageFile: file,
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleRemoveImage = () => {
    setFormData({
      ...formData,
      image: null,
      imageFile: null,
    });
  };

  const handleSave = () => {
    const dataToSubmit = new FormData();

    if (formData.username !== initialData.username) {
      dataToSubmit.append('username', formData.username);
    }
    if (formData.email !== initialData.email) {
      dataToSubmit.append('email', formData.email);
    }
    if (formData.phone !== initialData.phone) {
      dataToSubmit.append('phone', formData.phone);
    }
    if (formData.imageFile) {
      dataToSubmit.append('image', formData.imageFile);
    } else if (formData.image === null && initialData.image) {
      // If the image is removed
      dataToSubmit.append('image', '');
    }

    const userId = localStorage.getItem('userId');
    // if (userId) {
    //   dataToSubmit.append('_id', userId);
    // }

    // Dispatch the update action
    dispatch(updateUserInfo({ userId, dataToSubmit })).then(() => {
      onClose();
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Editar Perfil</DialogTitle>
      <DialogContent>
        <Box mt={1} display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Nombre de usuario"
            name="username"
            value={formData.username}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Correo electrónico"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Teléfono"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            fullWidth
          />
          <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
            <Avatar
              alt={formData?.username}
              src={formData?.image || ''}
              sx={{ width: 100, height: 100 }}
            />
            {formData.image ? (
              <IconButton onClick={handleRemoveImage} color="error" aria-label="delete">
                <Delete />
              </IconButton>
            ) : (
              <input
                accept="image/png, image/jpeg, image/jpg"
                style={{ display: 'none' }}
                id="image"
                name="image"
                type="file"
                onChange={handleChange}
              />
            )}
            {!formData.image && (
              <label htmlFor="image">
                <Button variant="outlined" color="primary" component="span">
                  Subir Imagen de Perfil
                </Button>
              </label>
            )}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="outlined">Cancelar</Button>
        <ButtonLoading text="Guardar" onClick={handleSave} loading={loading} disabled={loading}/>
      </DialogActions>
    </Dialog>
  );
}
