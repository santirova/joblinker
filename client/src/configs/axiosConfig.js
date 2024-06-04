import axios from "axios";
const api =  import.meta.env.VITE_API_URL;

export const axiosJL = axios.create({
  baseURL: api
});
