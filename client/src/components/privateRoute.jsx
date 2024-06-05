import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { privateAxios } from "../configs/axiosConfig";

const PrivateRoute = ({ children }) => {
    const  token  = localStorage.getItem("token")
        
    const [content, setContent] = useState(null);
    const navigate = useNavigate()

    useEffect(() => {
        console.log(token);
        const validateToken = async () => {
        if (!token) {
            navigate("/signin");
            return;
        } else {
            try {
            // Realiza una llamada a la ruta del servidor para validar el token
            const response = await privateAxios("/auth/validate", {
            method: "GET",
            headers: {
                "x-auth-token": `${token}`, // Agrega el token al encabezado de autorización
            },
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
