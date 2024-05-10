import { createSlice } from "@reduxjs/toolkit";
import { getPublications } from "../actions/publicationsAcction";


const initialState = {
    publications:null,
    loading: false,
    error: null,
}

export const publicationsSlice = createSlice({
    name: 'applications', 
    initialState,
    reducers: {
        // Aquí puedes agregar tus propias acciones si es necesario
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPublications.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPublications.fulfilled, (state, action) => {
                state.loading = false;
                state.publications = action.payload;
            })
            .addCase(getPublications.rejected, (state, action) => {
                console.log(action);
                state.loading = false;
                state.error = action.error;
            });
    },
});

export default publicationsSlice.reducer;
