import { LineChart } from "@mui/x-charts/LineChart";
import { Box, Typography } from "@mui/material";

export default function BasicLineChart({data}) {

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
        Postulaciones x Origen (Max 3)
      </Typography>
      <LineChart
        xAxis={[
          {
            data: [1, 2, 3, 4, 5, 6, 7],
            scaleType: 'point',
            valueFormatter: value => ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"][value - 1], // Formatear para mostrar los nombres de los días
            min:1,
            max:7
          }
        ]}
        series={data}
        slotProps={{
          legend:{hidden:true}, // Oculta la leyenda
        }}
        // width={isMobile ? 300 : 800}
        // height={isMobile ? 200 : 400}
      />
    </Box>
  );
}
