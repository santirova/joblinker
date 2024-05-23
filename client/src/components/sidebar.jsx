import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Divider, Stack, IconButton, ListItemButton, useMediaQuery } from '@mui/material';
import { PostAdd, BarChart, Person, Logout, WhatsApp, LinkedIn, Instagram, Mail, WebStories } from '@mui/icons-material';
import { NavLink, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:960px)'); // Utiliza useMediaQuery para determinar si el ancho de la ventana es menor a 960px

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: isMobile ? 60 : 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: isMobile ? 60 : 240,
          boxSizing: 'border-box',
          overflowX: 'hidden', // Prevenir el desbordamiento horizontal
        },
      }}
    >
      <Box
        sx={{
          width: isMobile ? 60 : 240,
          overflowX: 'hidden', // Prevenir el desbordamiento horizontal
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100vh',
        }}
      >
        <List>
          <ListItem>
            <Typography color="primary" variant="h6" fontFamily="Outfit, sans-sifs" fontWeight="bold" component="div" sx={{ flexGrow: 1, ml: isMobile ? 0 : 2, textAlign: isMobile ? 'center' : 'left', fontSize: isMobile ? '1rem' : '1.25rem' }}>
              {isMobile ? "JL" : "JobLinker"}
            </Typography>
          </ListItem>
          <Divider />
          <ListItemButton component={NavLink} to="/home/postulaciones">
            <ListItemIcon><PostAdd /></ListItemIcon>
            {!isMobile && <ListItemText primary="Postulaciones" />}
          </ListItemButton>
          <ListItemButton  component={NavLink} to="/home/publicaciones">
            <ListItemIcon><WebStories /></ListItemIcon>
            {!isMobile && <ListItemText primary="Publicaciones" />}
          </ListItemButton>
          <ListItemButton  component={NavLink} to="/home/estadisticas">
            <ListItemIcon><BarChart /></ListItemIcon>
            {!isMobile && <ListItemText primary="Estadísticas" />}
          </ListItemButton>
          <Divider />
          <ListItemButton onClick={() => navigate('/home/perfil')}>
            <ListItemIcon><Person /></ListItemIcon>
            {!isMobile && <ListItemText primary="Mi perfil" />}
          </ListItemButton>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon><Logout /></ListItemIcon>
            {!isMobile && <ListItemText primary="Cerrar sesión" />}
          </ListItemButton>
        </List>
        <Box>
          <Divider />
          <Stack direction={isMobile ? "column" : "row"} spacing={2} justifyContent="center" alignItems="center" padding={isMobile ? 1 : 2}>
            <IconButton color="inherit" href="https://wa.me/xxxxxxxxxx">
              <WhatsApp fontSize={isMobile ? "small" : "medium"} />
            </IconButton>
            <IconButton color="inherit" href="https://www.linkedin.com">
              <LinkedIn fontSize={isMobile ? "small" : "medium"} />
            </IconButton>
            <IconButton color="inherit" href="https://www.instagram.com">
              <Instagram fontSize={isMobile ? "small" : "medium"} />
            </IconButton>
            <IconButton color="inherit" href="mailto:info@example.com">
              <Mail fontSize={isMobile ? "small" : "medium"} />
            </IconButton>
          </Stack>
          {!isMobile && (
            <Typography variant="body2" align="center" color="inherit" sx={{ padding: '8px 0' }}>
              © {new Date().getFullYear()} JobLinker. Todos los derechos reservados.
            </Typography>
          )}
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
