import { createSlice } from "@reduxjs/toolkit";
import { signUp, signIn} from "../actions/userActions";

const initialState = {
    userInfo:{},
    loading: false,
    error: null,
}

export const userSlice = createSlice({
    name: 'user', // Corregí el nombre del slice
    initialState,
    reducers: {
        // Aquí puedes agregar tus propias acciones si es necesario
    },
    extraReducers: (builder) => {
        builder
            .addCase(signUp.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signUp.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(signUp.rejected, (state, action) => {
                console.log(action);
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(signIn.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signIn.fulfilled, (state,action) => {
                state.loading = false;
                state.userInfo = action.payload
                state.error = null;
            })
            .addCase(signIn.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default userSlice.reducer;