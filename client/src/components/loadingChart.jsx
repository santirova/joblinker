import { Box, CircularProgress } from "@mui/material";

const LoadingChart = () => (
  <Box
    display="flex"
    alignItems="center"
    justifyContent="center"
    bgcolor="whitesmoke"
    width="100%"
    sx={{
        height: { xs: "250px", md: "400px" },
        backgroundColor: "#FFF",
        borderRadius: "8px",
        boxShadow: 3,
        padding: 2,
    }}
  >
    <CircularProgress />
  </Box>
);

export default LoadingChart;
// width: "100%",
//         height: { xs: "250px", md: "400px" },
//         backgroundColor: "#FFF",
//         borderRadius: "8px",
//         boxShadow: 3,
//         padding: 2,