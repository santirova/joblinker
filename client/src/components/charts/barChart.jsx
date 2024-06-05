import { Box, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';


export default function BasicBars({data}) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%", 
        height: { xs: "250px", md: "400px" },
        backgroundColor: "#FFF",
        borderRadius: "8px",
        boxShadow: 3,
        padding: 2,
        flexDirection: "column"
      }}
    >
      <Typography fontFamily="Outfit, sans-serif" variant="h6" sx={{ marginBottom: 2 }}>
        Postulaciones Semanales x Día
      </Typography>
      <BarChart
        xAxis={[{ scaleType: 'band', data: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'] }]}
        series={[{ data }]}
        // width={isMobile ? 300 : 500}
        // height={isMobile ? 200 : 300}
      />
    </Box>
  );
}
