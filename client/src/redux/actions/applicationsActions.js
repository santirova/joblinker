import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'

export const getUserApplications = createAsyncThunk(
    'data/fetchApiData',
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