// LoginForm.js
import { Button, Container, IconButton, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { formStyles } from '../styles/formStyles';

export default function SignInForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    showPassword: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleShowPassword = () => {
    setFormData({ ...formData, showPassword: !formData.showPassword });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes enviar los datos del formulario a tu servidor para autenticación
    console.log(formData);
  };

  const isFormValid = () => {
    return (
      formData.email.trim() !== '' &&
      formData.password.trim() !== ''
    )
  };
  return (
    <Container 
      maxWidth="sm" 
      style={formStyles}
    >
      <Typography variant="h4" gutterBottom style={{ fontFamily: 'Outfit, sans-serif' }}>
        Iniciar Sesión
      </Typography>
      <TextField
        label="Email"
        variant="outlined"
        id="email"
        name="email"
        type="email"
        fullWidth
        required
        value={formData.email}
        onChange={handleChange}
        style={{ marginBottom: '16px' }}
      />
      <TextField
        label="Contraseña"
        variant="outlined"
        id="password"
        name="password"
        type={formData.showPassword ? 'text' : 'password'}
        fullWidth
        required
        value={formData.password}
        onChange={handleChange}
        InputProps={{
          endAdornment: (
            <IconButton onClick={handleShowPassword}>
              {formData.showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          )
        }}
        style={{ marginBottom: '16px' }}
      />
      <Button variant="contained" type="submit" onClick={handleSubmit} disabled={!isFormValid()}>
        Iniciar Sesión
      </Button>
    </Container>
  );
}
