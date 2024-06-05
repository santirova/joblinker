import { Box, Typography, Grid, Divider } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

export default function ProfileInfo({ user }) {
  return (
    <Box width="100%" display="flex" alignItems="center" justifyContent="center">
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={6}>
          <Box display="flex">
            <AccountCircleIcon color="primary" />
            <Typography variant="body1" ml={1}>
              {user?.username}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
        <Box display="flex">
          <EmailIcon color="primary" />
          <Typography variant="body1" ml={1}>
            {user?.email}
          </Typography>
          </Box>
        </Grid>
       
        <Grid item xs={12} md={6}>
          <Box display="flex">
            <PhoneIcon color="primary"/>
            <Typography variant="body1" ml={1}>
            {user?.phone}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box display="flex" >
            <CalendarTodayIcon color="primary" />
            <Typography variant="body1" ml={1}>
              {new Date(user?.creatAt).toLocaleDateString()}
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Divider sx={{ mt: 2 }} />
    </Box>
  );
}
