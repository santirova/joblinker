import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'

export const getUserApplications = createAsyncThunk(
    'get/fetchApiData',
    async (id) =>{  
        try {
            const response = await axios.get(`http://localhost:4001/application/${id}`);
            return response.data; // Retorna los datos obtenidos de la API
        }
         catch (error) {
            // Si hay un error, rechaza la promesa con el valor del error
            console.error('Error fetching user applications:', error.message);
            throw new Error('Error fetching user applications: ' + error.message);
        }
    }
);


export const postApplication = createAsyncThunk(
    'post/postApplication',
    async (data,thunkAPI) =>{  
        try {
            const response = await axios.post(`http://localhost:4001/application/${data.id}`,data.formData);
            return response.data; // Retorna los datos obtenidos de la API
        }
         catch (error) {
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