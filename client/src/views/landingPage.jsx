import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Grid, Box, Paper, Dialog, DialogTitle, DialogContent, DialogContentText, CircularProgress } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { styled } from '@mui/system';
import backgroundImage from '/fondoLanding.jpg'; // Reemplaza con la ruta de tu imagen de fondo

const HeroSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '60vh',
  background: `url(${backgroundImage}) no-repeat center center`,
  backgroundSize: 'cover',
  color: '#fff',
  textAlign: 'center',
  padding: theme.spacing(4),
  boxShadow: 'inset 0 0 0 1000px rgba(0, 0, 0, 0.5)',
}));

const FeatureCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-10px)',
  },
}));

const LandingPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const wakeUpServer = async () => {
      try {
        const response = await fetch('/api/ping'); // Cambia esta URL según sea necesario
        if (response.ok) {
          setLoading(false); // Servidor está despierto
        } else {
          console.error('Server did not respond correctly');
        }
      } catch (error) {
        console.error('Error waking up the server:', error);
      }
    };

    wakeUpServer();
  }, []);

  return (
    <Box bgcolor="whitesmoke" minHeight="100vh">
      <Dialog open={loading}>
        <DialogTitle>Espere un momento</DialogTitle>
        <DialogContent>
          <DialogContentText>
            La instancia del servidor se está levantando. Esto puede tomar algunos segundos debido al uso de una instancia gratuita en Render, la cual se suspende después de periodos de inactividad. Gracias por su paciencia.
          </DialogContentText>
          <Box display="flex" justifyContent="center" mt={2}>
            <CircularProgress />
          </Box>
        </DialogContent>
      </Dialog>
      <HeroSection>
        <Typography variant="h2" component="h1" gutterBottom fontFamily="Outfit, sans-serif">
          <strong>¡Bienvenido a JobLinker!</strong>
        </Typography>
        <Typography variant="h5" paragraph>
          Simplifica tu búsqueda de empleo con JobLinker, la plataforma todo en uno para gestionar tus postulaciones laborales.
        </Typography>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={12} sm={6}>
            <Button
              component={Link}
              to="/signin"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
            >
              Iniciar Sesión
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              component={Link}
              to="/signup"
              variant="outlined"
              color="primary"
              size="large"
              fullWidth
            >
              Registrarse
            </Button>
          </Grid>
        </Grid>
      </HeroSection>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h3" component="h2" gutterBottom fontFamily="Outfit, sans-serif" align="center">
          Características Principales
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <FeatureCard>
              <CheckCircleIcon style={{ fontSize: '3rem', marginBottom: '16px' }} color='primary' />
              <Typography variant="h5" component="h3" gutterBottom>
                Seguimiento de Postulaciones
              </Typography>
              <Typography variant="body1" paragraph>
                Mantén un registro organizado de todas tus postulaciones laborales y haz un seguimiento de su estado en un solo lugar.
              </Typography>
            </FeatureCard>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FeatureCard>
              <CheckCircleIcon style={{ fontSize: '3rem', marginBottom: '16px' }} color='primary' />
              <Typography variant="h5" component="h3" gutterBottom>
                Estadísticas Detalladas
              </Typography>
              <Typography variant="body1" paragraph>
                Explora estadísticas detalladas sobre tus postulaciones, incluyendo porcentajes, cantidades y más, para obtener información valiosa sobre tu búsqueda de empleo.
              </Typography>
            </FeatureCard>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FeatureCard>
              <CheckCircleIcon style={{ fontSize: '3rem', marginBottom: '16px' }} color='primary' />
              <Typography variant="h5" component="h3" gutterBottom>
                Publicaciones de Usuarios
              </Typography>
              <Typography variant="body1" paragraph>
                Únete a una comunidad activa de usuarios y comparte y explora publicaciones relacionadas con la búsqueda laboral.
              </Typography>
            </FeatureCard>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default LandingPage;
