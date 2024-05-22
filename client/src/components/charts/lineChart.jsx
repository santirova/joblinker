import { LineChart } from "@mui/x-charts/LineChart";
import { Box, useMediaQuery, useTheme } from "@mui/material";

export default function BasicLineChart() {
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width:960px)'); // Utiliza useMediaQuery para determinar si el ancho de la ventana es menor a 960px
  return (
    <Box
      sx={{
        width: "100%",
        height: { xs: "250px", md: "400px" },
        backgroundColor: "#FFF",
        borderRadius: "8px",
        boxShadow: theme.shadows[3],
        padding: 2,
      }}
    >
      <LineChart
        xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
        series={[{ data: [20, 15, 6, 22, 45, 14],label:"hola" },{ data: [36, 45, 32, 21, 47, 30] }]}
        width={isMobile ? 500 : 800}
        height={isMobile ? 200 : 400}
      />
    </Box>
  );
}
