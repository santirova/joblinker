import { useState } from 'react';
import { AppBar, Toolbar, Typography, Stack, IconButton, Container, Grid, Menu, MenuItem } from "@mui/material";
import { NavLink } from 'react-router-dom';
import { Menu as MenuIcon } from '@mui/icons-material';
import ButtonNavLink from "./buttonNavLink";

export default function NavBar() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item xs={8} md={4}>
              <Typography variant="h6" component="div" fontFamily='Outfit, sans-serif' fontWeight='bold'>
                JobLinker
              </Typography>
            </Grid>
            <Grid item xs={4} md={8}>
              <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Stack direction="row" spacing={2} sx={{ display: { xs: 'none', md: 'flex' } }}>
                  <ButtonNavLink label={"Publicaciones"} to={"/publicaciones"} />
                  <ButtonNavLink label={"Postulaciones"} to={"/postulaciones"} />
                  <ButtonNavLink label={"Estadisticas"} to={"/estadisticas"} />
                </Stack>
                <IconButton
                  color="inherit"
                  aria-label="menu"
                  onClick={handleMenuOpen}
                  sx={{ display: { xs: 'flex', md: 'none' } }}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem component={NavLink} to={"/publicaciones"} onClick={handleMenuClose}>Publicaciones</MenuItem>
                  <MenuItem component={NavLink} to={"/postulaciones"} onClick={handleMenuClose}>Postulaciones</MenuItem>
                  <MenuItem component={NavLink} to={"/estadisticas"} onClick={handleMenuClose}>Estadisticas</MenuItem>
                </Menu>
              </Stack>
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
