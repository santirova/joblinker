import { createSlice } from "@reduxjs/toolkit";
import { getUserApplications, postApplication } from "../actions/applicationsActions";

const initialState = {
    userApplications: null,
    filteredApplications: null,
    loading: false,
    error: null,
    postError: null,
    filters: {
        selectedLevel: "",
        selectedPosition: "",
        orderBy: "Nuevo a viejo",
    },
};

export const applicationsSlice = createSlice({
    name: 'applications',
    initialState,
    reducers: {
        setFilters: (state, action) => {
            state.filters = action.payload;
        },
        filterApplications: (state) => {
            const { selectedLevel, selectedPosition, orderBy } = state.filters;
            let filtered = state.userApplications;

            if (selectedLevel) {
                filtered = filtered.filter(app => app.level === selectedLevel);
            }

            if (selectedPosition) {
                filtered = filtered.filter(app => app.position === selectedPosition);
            }

            switch (orderBy) {
                case "Nuevo a viejo":
                    filtered?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    break;
                case "Viejo a nuevo":
                    filtered?.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                    break;
                case "De la A - Z (por empresa)":
                    filtered?.sort((a, b) => a.company.localeCompare(b.company));
                    break;
                case "De la Z - A (por empresa)":
                    filtered?.sort((a, b) => b.company.localeCompare(a.company));
                    break;
                default:
                    break;
            }
            
            if (selectedLevel !== "" || selectedPosition !== "" ) {
                state.filteredApplications = filtered;
            }
            
        },
        clearFilters: (state) => {
            state.filters = {
                selectedLevel: "",
                selectedPosition: "",
                orderBy: "Nuevo a viejo",
            };
            state.filteredApplications = null;
        },
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
                if (state.filters.selectedLevel !== "" || state.filters.selectedPosition !=="" ) {
                    state.filters.selectedLevel = ""
                    state.filters.selectedPosition = ""
                    state.filteredApplications = null
                }
                // state.filteredApplications.unshift(action.payload);
            })
            .addCase(postApplication.rejected, (state, action) => {
                console.log(action);
                state.loading = false;
                state.postError = action.error;
            });
    },
});

export const { setFilters, filterApplications, clearFilters } = applicationsSlice.actions;
export default applicationsSlice.reducer;
