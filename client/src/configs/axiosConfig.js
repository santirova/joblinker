import axios from "axios";
const api =  import.meta.env.VITE_API_URL;


const token = localStorage.getItem("token")
export const privateAxios = axios.create({
  baseURL: `${api}priv`,
  headers:{
    "x-auth-token": token
  },
  withCredentials:true
});
