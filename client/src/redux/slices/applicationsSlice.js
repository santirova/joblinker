import { createSlice } from "@reduxjs/toolkit";
import { getUserApplications, postApplication } from "../actions/applicationsActions";

const initialState = {
    userApplications:null,
    loading: false,
    error: null,
    postError:null,
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
            })
            .addCase(postApplication.pending, (state) => {
                state.loading = true;
                state.postError = null;
            })
            .addCase(postApplication.fulfilled, (state, action) => {
                state.loading = false;
                state.userApplications.unshift(action.payload);
            })
            .addCase(postApplication.rejected, (state, action) => {
                console.log(action);
                state.loading = false;
                state.postError = action.error;
            });
    },
});

export default applicationsSlice.reducer;
