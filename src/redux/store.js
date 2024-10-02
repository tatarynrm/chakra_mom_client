import { configureStore } from '@reduxjs/toolkit'
import {authReducer} from './slices/auth.slice'
import { transportationReducer } from './slices/transportations.slice'
export const store = configureStore({
  reducer: {
    auth:authReducer,
    transportations:transportationReducer
  },
})