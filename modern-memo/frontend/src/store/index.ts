import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import memoReducer from './slices/memoSlice'
import { api } from '../api'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    memo: memoReducer,
    [api.reducerPath]: api.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 