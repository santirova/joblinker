import { PieChart } from "@mui/x-charts/PieChart";
import { Box, useMediaQuery } from "@mui/material";

export default function BasicPie() {
  const isMobile = useMediaQuery('(max-width:xs)');
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
        boxShadow: 3,
        padding: 2,
      }}
    >
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: 10, label:"mid"},
              { id: 1, value: 15, label:"senior"},
              { id: 2, value: 20, label:"junior"},
            ],
          },
        ]}
        width={isMobile ? 200 : 400}
        height={isMobile ? 200 : 400}
      />
    </Box>
  );
}
