import { Box, Container, Grid, Typography, Button, Avatar, Paper } from "@mui/material";
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
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          padding={2}
          border={1}
          borderColor="grey.300"
          borderRadius={2}
          boxShadow={2}
          bgcolor="white"
          component={Paper}
        >
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={4} textAlign="center">
              <Avatar
                alt={userInfo?.username}
                src={userInfo?.image}
                sx={{ width: 100, height: 100, margin: "auto" }}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <ProfileInfo user={userInfo} />
              {/*  */}
            </Grid>
          </Grid>
          <Box mt={2} display="flex" >
                <Button variant="contained" color="primary" onClick={handleEditOpen}>
                  Editar Perfil
                </Button>
          </Box>
        </Box>
      </Container>
      <EditProfileDialog open={editOpen} onClose={handleEditClose} user={userInfo} />
    </Box>
  );
}

{/* <EditProfileDialog open={editOpen} onClose={handleEditClose} user={userInfo} /> */}