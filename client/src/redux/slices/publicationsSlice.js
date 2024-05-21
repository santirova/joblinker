import { createSlice } from "@reduxjs/toolkit";
import { getPublications,postPublication } from "../actions/publicationsAcction";


const initialState = {
    publications:null,
    loading: false,
    error: null,
    postError:null,
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
            })
            .addCase(postPublication.pending, (state) => {
                state.loading = true;
                state.postError = null;
            })
            .addCase(postPublication.fulfilled, (state, action) => {
                state.loading = false;
                state.publications.unshift(action.payload)
            })
            .addCase(postPublication.rejected, (state, action) => {
                state.loading = false;
                state.postError = action.error;
            });
    },
});

export default publicationsSlice.reducer;
