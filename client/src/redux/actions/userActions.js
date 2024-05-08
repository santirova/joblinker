import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const signUp = createAsyncThunk(
    "type/signup",
    async (data, thunkAPI) => {
      try {
        const response = await axios.post("http://localhost:4001/auth/register", data);
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
      const response = await axios.post("http://localhost:4001/auth/login",data, {withCredentials:true});
      // Si deseas obtener algo de vuelta
      console.log(response.cookie);
      console.log(response.data);
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
