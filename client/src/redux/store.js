import { configureStore } from '@reduxjs/toolkit'
import applicationsReducer from './slices/applicationsSlice'
import userReducer from './slices/userSlice'
import publicationsReducer from './slices/publicationsSlice'
import statsReducer from './slices/statsSlice'

export const store = configureStore({
  reducer: {
    applications:applicationsReducer,
    user:userReducer,
    publications:publicationsReducer,
    stats:statsReducer
  },
})