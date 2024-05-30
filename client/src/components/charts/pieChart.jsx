import { PieChart } from "@mui/x-charts/PieChart";
import { Box, Typography } from "@mui/material";

export default function BasicPie({ data }) {
  const chartData = data.length > 0 ? data : [{ id: 'Sin datos', value: 1, label: 'Sin datos' }];
  const sizing = {
    margin: { right: 5 },
    legend: { hidden: true },
  };
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
        Tecnologias Mas Aplicadas (Max 5) 
      </Typography>
      <PieChart
        series={[{
          data: chartData,
          highlightScope: { faded: 'global', highlighted: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
        }]}
        // slotProps={{
        //   legend:{hidden:true}, // Oculta la leyenda
          
        // }}
        {...sizing}
      />
    </Box>
  );
}

// <Box
//       sx={{
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         width: "100%",
//         height: { xs: "250px", md: "400px" },
//         backgroundColor: "#FFF",
//         borderRadius: "8px",
//         boxShadow: 3,
//         padding: 2,
//       }}
//     >