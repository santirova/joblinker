import { createSlice } from "@reduxjs/toolkit";
import { getUserApplications } from "../actions/applicationsActions";

const initialState = {
    userApplications:[],
    loading: false,
    error: null,
}

export const applicationsSlice = createSlice({
    name: 'applications', // Corregí el nombre del slice
    initialState,
    reducers: {
        // Aquí puedes agregar tus propias acciones si es necesario
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserApplications.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserApplications.fulfilled, (state, action) => {
                state.loading = false;
                state.userApplications = action.payload;
            })
            .addCase(getUserApplications.rejected, (state, action) => {
                console.log(action);
                state.loading = false;
                state.error = action.error;
            });
    },
});

export default applicationsSlice.reducer;
