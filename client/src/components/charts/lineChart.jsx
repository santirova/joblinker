import { LineChart } from "@mui/x-charts/LineChart";
import { Box } from "@mui/material";

export default function BasicLineChart() {

  return (
    <Box
      sx={{
        width: "100%",
        height: { xs: "250px", md: "400px" },
        backgroundColor: "#FFF",
        borderRadius: "8px",
        boxShadow: 3,
        padding: 2,
      }}
    >
      <LineChart
        xAxis={[
          {
            data: [1, 2, 3, 4, 5, 6, 7],
            scaleType: 'point', // Utiliza 'band' para evitar valores intermedios
            valueFormatter: value => ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"][value - 1], // Formatear para mostrar los nombres de los días
            min:1,
            max:7
          }
        ]}
        series={
          [
          {
              label: "LinkedIn",
              data: [3, 5, 2, 4, 1, ]
          },
          {
              label: "Indeed",
              data: [1, 2, 3, 2, 5, 1, 0]
          },
          {
              label: "Glassdoor",
              data: [0, 1, 0, 0, 2, 1, 3]
          }
      ]
      }
        // width={isMobile ? 300 : 800}
        // height={isMobile ? 200 : 400}
      />
    </Box>
  );
}
