import { Outlet } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";
import Footer from "../components/footer";
import NavBar from "../components/navBar";


export default function Root() {
  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <CssBaseline />
      <NavBar />
      <Box component="main" flexGrow={1} id="content">
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}
