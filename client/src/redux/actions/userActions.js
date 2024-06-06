import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { privateAxios } from "../../configs/axiosConfig";
const api =  import.meta.env.VITE_API_URL;
export const signUp = createAsyncThunk(
    "type/signup",
    async (data, thunkAPI) => {
      try {
        const response = await axios.post(`${api}auth/register`, data);
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

export const signIn = createAsyncThunk(
  "type/signin",
  async (data,thunkAPI) => {
    try {
      const response = await axios.post(`${api}auth/login`,data);
      // Si deseas obtener algo de vuelta
      localStorage.setItem('userId', response.data.user._id);
      localStorage.setItem('token', response.data.token);
      return response.data.user;
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

export const getUserInfo = createAsyncThunk(
  "get/userInfo",
  async (userId,thunkAPI) => {
    try {
      const response = await privateAxios.get(`auth/userinfo/${userId}`);
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

export const updateUserInfo = createAsyncThunk(
  "update/userInfo",
  async (data,thunkAPI) => {
    const { userId, dataToSubmit } = data
    try {
      const response = await privateAxios.put(`/auth/update/${userId}`, dataToSubmit);
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
