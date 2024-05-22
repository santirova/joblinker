import { Box } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';

export default function BasicBars() {
  return (
    <Box
      sx={{
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        width: "100%",
        height: { xs: "250px", md: "400px" },
        backgroundColor: "#FFF",
        borderRadius: "8px",
        boxShadow:3,
        padding: 2,
      }}
    >
    <BarChart
      xAxis={[{ scaleType: 'band', data: ['Lun', 'Mar', 'Mier',"Jue","Vie","Sab","Dom"] }]}
      series={[{ data: [3,5,3,1,6,9,3]}]}
      width={500}
      height={300}
    />
    </Box>
  );
}