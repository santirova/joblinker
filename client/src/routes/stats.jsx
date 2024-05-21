import { Box, Container, Grid } from "@mui/material";
import StatBox from "../components/statBox";
import BasicLineChart from "../components/charts/lineChart";
import BasicPie from "../components/charts/pieChart";
// import StatBox from " "

export default function Stats() {
  return (
    <Box bgcolor="#F5F5F5" padding={2} minHeight="100vh">
      <Container  maxWidth="lg">
        <Grid container spacing={1} >
          <Grid item xs={12} md={6}>
            <StatBox title="semanales" subtitle="4"/>
          </Grid>
          <Grid item xs={12} md={6}>
            <StatBox  title="hoy" subtitle="1"/>
          </Grid>
          <Grid item xs={12} md={6}>
            <BasicLineChart/>
          </Grid>
          <Grid item xs={12} md={6}>
            <BasicPie/>
          </Grid>
          
        </Grid>
      </Container>
    </Box>
  )
}
