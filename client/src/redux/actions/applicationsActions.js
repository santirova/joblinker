import { createAsyncThunk } from '@reduxjs/toolkit';
import { privateAxios } from '../../configs/axiosConfig';

export const getUserApplications = createAsyncThunk(
    'get/fetchApiData',
    async (id) =>{  
        try {
            const response = await privateAxios.get(`/application/${id}`);
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
            const { id, formData } = data
            const response = await privateAxios.post(`/application/${id}`,formData);
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

export const updateApplication = createAsyncThunk(
    'applications/updateApplication',
    async (data,thunkAPI) =>{  
        try {
            const { formData, id, applicationId } = data
            const response = await privateAxios.put(`/application/${id}`,{data:formData, applicationId});
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