import { Link } from 'react-router-dom';
import { Container, Typography, Button, Grid, Box, Paper } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const LandingPage = () => {
  return (
    <Box py="2%" bgcolor="whitesmoke">
      <Container maxWidth="md" >
        {/* Hero Section */}
        <Paper
            style={{
                color: '#333333',
                padding: '64px 0',
                textAlign: 'center',
                marginBottom: '32px',
            }}
            elevation={3}
            >
            <Typography variant="h2" gutterBottom fontFamily="Outfit, sans-serif" color="primary">
                <strong>¡Bienvenido a JobLinker!</strong>
            </Typography>
            <Typography variant="body1" paragraph>
                Simplifica tu búsqueda de empleo con JobLinker, la plataforma todo en uno para gestionar tus postulaciones laborales.
            </Typography>
            <Grid container justifyContent="center">
                <Grid item>
                <Button
                    component={Link}
                    to="/signin"
                    variant="contained"
                    color="primary"
                    size="large"
                    style={{ margin: '8px' }}
                >
                    Iniciar Sesión
                </Button>
                <Button
                    component={Link}
                    to="/signup"
                    variant="outlined"
                    color="primary"
                    size="large"
                    style={{ margin: '8px' }}
                >
                    Registrarse
                </Button>
                </Grid>
            </Grid>
            </Paper>

        {/* Features Section */}
        <Paper
          style={{
            padding: '32px',
          }}
          elevation={3}
        >
          <Typography variant="h3" gutterBottom fontFamily="Outfit, sans-serif">
            Características Principales
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <CheckCircleIcon style={{ fontSize: '3rem', color: '#1976d2', marginBottom: '16px' }} />
              <Typography variant="h5" gutterBottom>
                Seguimiento de Postulaciones
              </Typography>
              <Typography variant="body2" paragraph>
                Mantén un registro organizado de todas tus postulaciones laborales y haz un seguimiento de su estado en un solo lugar.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <CheckCircleIcon style={{ fontSize: '3rem', color: '#1976d2', marginBottom: '16px' }} />
              <Typography variant="h5" gutterBottom>
                Estadísticas Detalladas
              </Typography>
              <Typography variant="body2" paragraph>
                Explora estadísticas detalladas sobre tus postulaciones, incluyendo porcentajes, cantidades y más, para obtener información valiosa sobre tu búsqueda de empleo.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <CheckCircleIcon style={{ fontSize: '3rem', color: '#1976d2', marginBottom: '16px' }} />
              <Typography variant="h5" gutterBottom>
                Publicaciones de Usuarios
              </Typography>
              <Typography variant="body2" paragraph>
                Únete a una comunidad activa de usuarios y comparte y explora publicaciones relacionadas con la búsqueda laboral.
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default LandingPage;
