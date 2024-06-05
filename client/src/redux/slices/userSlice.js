import { createSlice } from "@reduxjs/toolkit";
import { signUp, signIn, getUserInfo, updateUserInfo} from "../actions/userActions";

const initialState = {
    userInfo:null,
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
            //signUp
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
            //signIn
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
            })
            //userInfo
            .addCase(getUserInfo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserInfo.fulfilled, (state,action) => {
                state.loading = false;
                state.userInfo = action.payload
                state.error = null;
            })
            .addCase(getUserInfo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateUserInfo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserInfo.fulfilled, (state,action) => {
                state.loading = false;
                state.userInfo = action.payload
                state.error = null;
            })
            .addCase(updateUserInfo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default userSlice.reducer;