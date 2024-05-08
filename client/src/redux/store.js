import { configureStore } from '@reduxjs/toolkit'
import applicationsReducer from './slices/applicationsSlice'
import userReducer from './slices/userSlice'

export const store = configureStore({
  reducer: {
    applications:applicationsReducer,
    user:userReducer
  },
})