import { Outlet, useNavigate } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";
import Footer from "../components/footer";
import NavBar from "../components/navBar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../redux/actions/userActions";


export default function Root() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { userInfo } = useSelector((state) => state.user)
  const getinfo = async (id)=> {
    await dispatch(getUserInfo(id)).unwrap()
  } 
  useEffect(() => {
    if (!userInfo) {
      const userId = localStorage.getItem('userId')
      getinfo(userId)
    }
    if (window.location.pathname === '/home') {
      navigate("/home/postulaciones");
    }
  }, [navigate]);
  
  return (
    <Box minHeight="100vh" display="grid" gridTemplateRows="auto 1fr auto">
      <CssBaseline />
      <NavBar />
      <Box component="main" id="content" bgcolor="whitesmoke" paddingBottom={0}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}
