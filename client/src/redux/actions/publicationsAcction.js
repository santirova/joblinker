import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'

export const getPublications = createAsyncThunk(
    'get/publications',
    async () =>{  
        try {
            const response = await axios.get(`http://localhost:4001/post`);
            return response.data;
        }
         catch (error) {
            console.error('Error fetching user applications:', error.message);
            throw new Error('Error fetching user applications: ' + error.message);
        }
    }
);

export const postPublication = createAsyncThunk(
    'post/publication',
    async (postData, thunkAPI) => {  
      try {
        const response = await axios.post(`http://localhost:4001/post`, postData);
        return response.data; 
      } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
          return thunkAPI.rejectWithValue(error.response.data.error);
        } else {
          throw new Error('Error al enviar la publicación: ' + error.message);
        }
      }
    }
  );
  export const commentPublication = createAsyncThunk(
    'post/comment',
    async (postData, thunkAPI) => {  
      const { userId , ...data} = postData
      const publicationId = data.postId
      try {
        const response = await axios.post(`http://localhost:4001/comment/${userId}`, data);
        return {publicationId, ...response.data} 
      } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
          return thunkAPI.rejectWithValue(error.response.data.error);
        } else {
          throw new Error('Error al enviar la publicación: ' + error.message);
        }
      }
    }
  );