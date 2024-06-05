import { createAsyncThunk } from "@reduxjs/toolkit";
import { privateAxios } from "../../configs/axiosConfig";
export const getStatsBoxs = createAsyncThunk(
    "get/statsBoxs",
    async (userId, thunkAPI) => {
      try {
        const response = await privateAxios.get(`/stats/statsbox/${userId}`);
        // Si deseas obtener algo de vuelta
        return response.data;
      } catch (error) {
        // Manejar el error y devolverlo al estado
        if (error.response && error.response.data && error.response.data.error) {
          // Si el error proviene del servidor y contiene un mensaje específico
          return thunkAPI.rejectWithValue(error.response.data.error);
        } else {
          // Si hay un error genérico
          throw new Error('Error fetching user applications: ' + error.message);
        }
      }
    }
);

export const fetchAllStats = createAsyncThunk(
    'stats/fetchAll',
    async (userId, { rejectWithValue }) => {
      try {
        // Hacer las llamadas a la API en paralelo
        const [ statsBar, statsPie, statsLine] = await Promise.all([
          privateAxios.get(`/stats/statsbar/${userId}`),
          privateAxios.get(`/stats/statspie/${userId}`),
          privateAxios.get(`/stats/statsline/${userId}`),
        ]);
  
        // Devolver los datos recibidos
        return {
          statsBar: statsBar.data,
          statsPie: statsPie.data,
          statsLine: statsLine.data,
        };
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );