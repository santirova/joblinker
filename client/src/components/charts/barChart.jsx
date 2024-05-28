import { Box } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';


export default function BasicBars() {

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "auto",
        height: { xs: "250px", md: "400px" },
        backgroundColor: "#FFF",
        borderRadius: "8px",
        boxShadow: 3,
        padding: 2,
      }}
    >
      <BarChart
        xAxis={[{ scaleType: 'band', data: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'] }]}
        series={[{ data: [3,0,0,0,0,0,0] }]}
        // width={isMobile ? 300 : 500}
        // height={isMobile ? 200 : 300}
      />
    </Box>
  );
}
