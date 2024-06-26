import { Box, Container, Grid, Typography } from "@mui/material";
import StatBox from "../components/charts/statBox.jsx";
import BasicLineChart from "../components/charts/lineChart.jsx";
import BasicPie from "../components/charts/pieChart.jsx";
import BasicBars from "../components/charts/barChart.jsx";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllStats, getStatsBoxs } from "../redux/actions/statsActions.js";
import LoadingChart from "../components/loadingChart.jsx";

export default function Stats() {
  const dispatch = useDispatch();
  const id = localStorage.getItem('userId');
  const { statsBox, statsLine, statsBar, statsPie, loading } = useSelector(state => state.stats);

  useEffect(() => {
    dispatch(getStatsBoxs(id));
    dispatch(fetchAllStats(id));
  }, [dispatch, id]);

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
              subtitle={statsBox?.monthlyApplications || 0}
              backgroundColor="#FFD700"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <StatBox
              title="Postulaciones Semanales"
              subtitle={statsBox?.weeklyApplications || 0}
              backgroundColor="#32CD32"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <StatBox
              title="Entrevistas Mensuales"
              subtitle={statsBox?.monthlyInterviews || 0}
              backgroundColor="#1E90FF"
            />
          </Grid>
          <Grid item xs={12}>
            {loading ? <LoadingChart /> : <BasicLineChart data={statsLine || []} />}
          </Grid>
          <Grid item xs={12} md={6}>
            {loading ? <LoadingChart /> : <BasicPie data={statsPie || []} />}
          </Grid>
          <Grid item xs={12} md={6}>
            {loading ? <LoadingChart /> : (statsBar && statsBar.length > 0 ? <BasicBars data={statsBar} /> : <Typography>Sin datos</Typography>)}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
