import { Box, Button, Container, IconButton, Link, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { formStyles } from '../styles/formStyles';
import { useDispatch, useSelector } from "react-redux";
import { signUp } from '../redux/actions/userActions';
import { useNavigate } from 'react-router-dom';


export default function SignUpForm() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { error , loading } = useSelector((state) => state.user)

  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    repeatPassword: '',
    phoneNumber: '',
    showPassword: false,
    showRepeatPassword: false,
  });

  const [errors, setErrors] = useState({
    emailError: '',
    phoneNumberError: '',
    passwordMatchError: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validar campos mientras se escriben
    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setErrors({ ...errors, emailError: emailRegex.test(value) ? '' : 'Email no válido' });
    } else if (name === 'phoneNumber') {
      const phoneRegex = /^\d*$/; // Solo números
      setErrors({ ...errors, phoneNumberError: phoneRegex.test(value) ? '' : 'Teléfono debe contener solo números' });
    } else if (name === 'password' || name === 'repeatPassword') {
      if (name === 'repeatPassword' && formData.password !== value) {
        setErrors({ ...errors, passwordMatchError: 'Las contraseñas no coinciden' });
      } else if (name === 'repeatPassword' && formData.password === value) {
        setErrors({ ...errors, passwordMatchError: '' });
      }
    }
  };

  const handleShowPassword = () => {
    setFormData({ ...formData, showPassword: !formData.showPassword });
  };

  const handleShowRepeatPassword = () => {
    setFormData({ ...formData, showRepeatPassword: !formData.showRepeatPassword });
  };

  const isFormValid = () => {
    return (
      formData.email.trim() !== '' &&
      formData.username.trim() !== '' &&
      formData.password.trim() !== '' &&
      formData.repeatPassword.trim() !== '' &&
      formData.phoneNumber.trim() !== '' &&
      errors.emailError === '' &&
      errors.phoneNumberError === '' &&
      errors.passwordMatchError === ''
    );
  };

  const onSubmit = async (data) =>{
    const userInfo = {
      username:data?.username,
      email:data?.email,
      phone:data?.phoneNumber,
      password:data?.password,
    }
    try {
      await dispatch(signUp(userInfo))
        .unwrap()
        .then(()=> navigate("/signin"))
    } catch (error) {
        console.log(error)
    }
      

  }
  return (
    <Container 
      maxWidth="sm" 
      style={formStyles}
    >
      <Typography variant="h4" gutterBottom style={{ fontFamily: 'Outfit, sans-serif' }}>
        Registro
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
        error={errors.emailError !== ''}
        helperText={errors.emailError}
        style={{ marginBottom: '16px' }}
      />
      <TextField
        label="Usuario"
        variant="outlined"
        id="username"
        name="username"
        fullWidth
        required
        value={formData.username}
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
      <TextField
        label="Repetir Contraseña"
        variant="outlined"
        id="repeatPassword"
        name="repeatPassword"
        type={formData.showRepeatPassword ? 'text' : 'password'}
        fullWidth
        required
        value={formData.repeatPassword}
        onChange={handleChange}
        error={errors.passwordMatchError !== ''}
        helperText={errors.passwordMatchError}
        InputProps={{
          endAdornment: (
            <IconButton onClick={handleShowRepeatPassword}>
              {formData.showRepeatPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          )
        }}
        style={{ marginBottom: '16px' }}
      />
      <TextField
        label="Teléfono"
        variant="outlined"
        id="phoneNumber"
        name="phoneNumber"
        fullWidth
        required
        value={formData.phoneNumber}
        onChange={handleChange}
        error={errors.phoneNumberError !== ''}
        helperText={errors.phoneNumberError}
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
        disabled={!isFormValid() || loading}
        onClick={()=> onSubmit(formData)}
        style={{ position: 'relative' }}
      >
        {loading ? 'Registrando...' : 'Registrarse'}
      </Button>
      <Box textAlign="center" mt={2}>
        <Typography variant="body2">
          ¿Ya tienes cuenta?{' '}
          <Link href="#" onClick={() => navigate('/signin')}>
            Iniciar sesión
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}
