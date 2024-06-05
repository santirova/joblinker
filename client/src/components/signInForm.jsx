// SignInForm.js
import { Button, Container, IconButton, TextField, Typography, Box, Link } from '@mui/material';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../redux/actions/userActions';
import { useNavigate } from 'react-router-dom';
import { formStyles } from '../styles/formStyles';

export default function SignInForm() {
  const navigate = useNavigate();
  const { error, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log({ email: formData.email, password: formData.password });
      await dispatch(signIn({ email: formData.email, password: formData.password }))
        .unwrap()
        .then(() => navigate("/home"));
    } catch (error) {
      console.log('errrroooooooor');
    }
  };

  const isFormValid = () => {
    return (
      formData.email.trim() !== '' &&
      formData.password.trim() !== ''
    );
  };

  return (
    <Container maxWidth="sm" style={formStyles}>
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
      {error && (
        <Typography variant="body2" color="error" style={{ marginBottom: '16px' }}>
          {error}
        </Typography>
      )}
      <Button
        variant="contained"
        type="submit"
        onClick={handleSubmit}
        disabled={!isFormValid() || loading}
        style={{ marginBottom: '16px' }}
      >
        Iniciar Sesión
      </Button>
      <Box textAlign="center" mt={2}>
        <Typography variant="body2">
          ¿No tienes cuenta?{' '}
          <Link href="#" onClick={() => navigate('/signup')}>
            Regístrate
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}
