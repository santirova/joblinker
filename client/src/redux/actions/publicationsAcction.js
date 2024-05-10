import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'

export const getPublications = createAsyncThunk(
    'get/publications',
    async () =>{  
        try {
            const response = await axios.get(`http://localhost:4001/post`);
            return response.data; // Retorna los datos obtenidos de la API
        }
         catch (error) {
            // Si hay un error, rechaza la promesa con el valor del error
            console.error('Error fetching user applications:', error.message);
            throw new Error('Error fetching user applications: ' + error.message);
        }
    }
);