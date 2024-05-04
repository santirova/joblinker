import { AppBar, Toolbar, Typography, Stack, IconButton, Divider, Container, Grid } from "@mui/material";
import { WhatsApp, LinkedIn, Instagram, Mail } from "@mui/icons-material";

export default function Footer() {
  return (
    <AppBar position="static" color="primary">
      <Container maxWidth="lg">
        <Toolbar>
          <Grid container spacing={3}>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Stack direction="row" spacing={2}>
                <IconButton color="inherit" href="https://wa.me/xxxxxxxxxx"> {/* Reemplaza "xxxxxxxxxx" con tu número de teléfono de WhatsApp */}
                  <WhatsApp />
                </IconButton>
                <IconButton color="inherit" href="https://www.linkedin.com">
                  <LinkedIn />
                </IconButton>
                <IconButton color="inherit" href="https://www.instagram.com">
                  <Instagram />
                </IconButton> 
                <IconButton color="inherit" href="mailto:info@example.com">
                    <Mail />
                </IconButton>
              </Stack>
            </Grid>
          </Grid>
        </Toolbar>
        <Divider />
        <Typography variant="body2" align="center" color="inherit" style={{ padding: '8px 0' }}>
          © {new Date().getFullYear()} JobLinker. Todos los derechos reservados.
        </Typography>
      </Container>
    </AppBar>
  );
}
