import { createSlice } from "@reduxjs/toolkit";
import { fetchAllStats, getStatsBoxs } from "../actions/statsActions";

const initialState = {
    statsBox:null,
    statsBar: null,
    statsPie: null,
    statsLine: null,
    loading: false,
    error: null,
}

export const statsSlice = createSlice({
    name: 'stats', // Corregí el nombre del slice
    initialState,
    reducers: {
        // Aquí puedes agregar tus propias acciones si es necesario
    },
    extraReducers: (builder) => {
        builder
            .addCase(getStatsBoxs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getStatsBoxs.fulfilled, (state, action) => {
                state.loading = false;
                state.statsBox = action.payload;
            })
            .addCase(getStatsBoxs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
            .addCase(fetchAllStats.pending, (state) => {
                state.loading = true;
                state.error = null;
              })
              .addCase(fetchAllStats.fulfilled, (state, action) => {
                  state.statsBar = action.payload.statsBar;
                  state.statsPie = action.payload.statsPie;
                  state.statsLine = action.payload.statsLine;
                  state.loading = false;
              })
              .addCase(fetchAllStats.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
              });
        }
});

export default statsSlice.reducer;