import { Box, Container, Grid, Typography, Button, Avatar } from "@mui/material";
import { useState } from "react";
import ProfileInfo from "../components/profileInfo";
import EditProfileDialog from "../components/editProfileDialog";
import { useSelector } from "react-redux";

export default function ProfileView() {
  const [editOpen, setEditOpen] = useState(false);
  const { userInfo } = useSelector(state => state.user);

  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);

  return (
    <Box bgcolor="whitesmoke" minHeight="100vh" padding={2} overflow="hidden">
      <Container maxWidth="lg">
        <Box display="flex" alignItems="start" mb={2}>
          <Typography
            variant="h4"
            style={{ fontFamily: "Outfit, sans-serif", color: "#333333" }}
          >
            Mi perfil
          </Typography>
        </Box>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} sm={4} textAlign="center">
            <Avatar
              alt={userInfo?.username}
              src="/static/images/avatar/1.jpg"
              sx={{ width: 100, height: 100, margin: "auto" }}
            />
            <Typography variant="h5" mt={2}>
              {userInfo?.username}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <ProfileInfo user={userInfo} />
            <Box mt={2} textAlign={{ xs: "center", sm: "right" }}>
              <Button variant="contained" color="primary" onClick={handleEditOpen}>
                Editar Perfil
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Box mt={4}>
          <Typography variant="h5" gutterBottom>
            Información Adicional
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Box bgcolor="white" padding={2} borderRadius={2} boxShadow={1}>
                <Typography variant="body1">
                  <strong>Dirección:</strong> Calle Falsa 123
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box bgcolor="white" padding={2} borderRadius={2} boxShadow={1}>
                <Typography variant="body1">
                  <strong>Fecha de Nacimiento:</strong> 01/01/1990
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box bgcolor="white" padding={2} borderRadius={2} boxShadow={1}>
                <Typography variant="body1">
                  <strong>Ocupación:</strong> Desarrollador de Software
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box bgcolor="white" padding={2} borderRadius={2} boxShadow={1}>
                <Typography variant="body1">
                  <strong>Intereses:</strong> Programación, Lectura, Viajes
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <EditProfileDialog open={editOpen} onClose={handleEditClose} user={userInfo} />
    </Box>
  );
}
