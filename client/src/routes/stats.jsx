import { Box, Container, Grid, Typography } from "@mui/material";
import StatBox from "../components/charts/statBox";
import BasicLineChart from "../components/charts/lineChart";
import BasicPie from "../components/charts/pieChart";
import BasicBars from "../components/charts/barChart";

export default function Stats() {
  return (
    <Box bgcolor="#F5F5F5" padding={2} minHeight="100vh">
      <Container maxWidth="lg">
        <Box display="flex" alignItems="start" mb={2}>
          <Typography
            variant="h4"
            style={{ fontFamily: "Outfit, sans-serif", color: "#333333" }}
          >
            Estadísticas
          </Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <StatBox
              title="Postulaciones Mensuales"
              subtitle="120"
              backgroundColor="#FFD700"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <StatBox
              title="Postulaciones Semanales"
              subtitle="30"
              backgroundColor="#32CD32"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <StatBox
              title="Entrevistas Mensuales"
              subtitle="50"
              backgroundColor="#1E90FF"
            />
          </Grid>
          <Grid item xs={12}>
            <BasicLineChart />
          </Grid>
          <Grid item xs={12} md={6}>
            <BasicPie />
          </Grid>
          <Grid item xs={12} md={6}>
            <BasicBars />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
