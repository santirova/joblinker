import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Box, Avatar, IconButton } from "@mui/material";
import { useState } from "react";
import { Delete } from "@mui/icons-material";

export default function EditProfileDialog({ open, onClose, user }) {
  const [formData, setFormData] = useState({
    username: user?.username,
    email: user?.email,
    phone: user?.phone,
    image: user?.image,
    imageFile: null,
  });

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
    // Aquí puedes agregar la lógica para guardar los datos actualizados, incluyendo la imagen
    // Esto podría involucrar la conversión de formData a FormData si estás enviando la imagen al servidor
    onClose();
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
        <Button onClick={handleSave} color="primary" variant="contained">Guardar</Button>
      </DialogActions>
    </Dialog>
  );
}
