import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const api =  import.meta.env.VITE_API_URL;

const PrivateRoute = ({ children }) => {
    const  token  = localStorage.getItem("token")
        
    const [content, setContent] = useState(null);
    const navigate = useNavigate()

    useEffect(() => {
        const validateToken = async () => {
        if (!token) {
            navigate("/signin");
            return;
        } else {
            try {
            // Realiza una llamada a la ruta del servidor para validar el token
            const response = await axios(`${api}auth/validate`, {
            method: "GET",
            headers: {
                "x-auth-token": `${token}`, // Agrega el token al encabezado de autorización
            },
            withCredentials:true
            });
    
            if (response.status !== 200) {
            // El token no es válido, realiza la acción de cerrar sesión
            navigate("/signin");
            } else {
            setContent(children);
            }
        } catch (error) {
            console.error("Error al validar el token:", error);
            navigate("/signin");
        } 
        
        }

    };

    validateToken();
  }, [token]);

  return content ? content : <div> <h1>cargando.....</h1></div>;
};

export default PrivateRoute;
