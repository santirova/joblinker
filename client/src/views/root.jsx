import { Box, CssBaseline } from "@mui/material";
import Sidebar from "../components/sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../redux/actions/userActions";

export default function Root() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);

  const getinfo = async (id) => {
    await dispatch(getUserInfo(id)).unwrap();
  };

  useEffect(() => {
    if (!userInfo) {
      const userId = localStorage.getItem('userId');
      getinfo(userId);
    }
    if (window.location.pathname === '/home') {
      navigate("/home/postulaciones");
    }
  }, [navigate]);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, maxWidth:"100%", transition: 'margin-left 0.3s' }}> {/* Ajusta el margen izquierdo y el ancho máximo según el ancho de la ventana */}
        <Outlet />
      </Box>
    </Box>
  );
}
