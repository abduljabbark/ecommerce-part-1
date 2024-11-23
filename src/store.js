import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slices/add-cart/AddCartSlice'

export const store = configureStore({
    reducer: {
      counter: counterReducer,
    },
  })