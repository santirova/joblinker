import axios from "axios";
const api =  import.meta.env.VITE_API_URL;

export const privateAxios = axios.create({
  baseURL: api
});
