import { Box, Typography, Grid, Divider } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

export default function ProfileInfo({ user }) {
  return (
    <Box width="100%">
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6}>
          <AccountCircleIcon color="primary" />
          <Typography variant="body1" mt={1}>
            {user?.username}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <EmailIcon color="primary" />
          <Typography variant="body1" mt={1}>
            <strong>Correo electrónico:</strong> {user?.email}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <PhoneIcon color="primary" />
          <Typography variant="body1" mt={1}>
            <strong>Teléfono:</strong> {user?.phone}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <CalendarTodayIcon color="primary" />
          <Typography variant="body1" mt={1}>
            <strong>Cuenta creada el:</strong> {new Date(user?.creatAt).toLocaleDateString()}
          </Typography>
        </Grid>
      </Grid>
      <Divider sx={{ mt: 2 }} />
    </Box>
  );
}
