import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slices/add-cart/AddCartSlice'
import productReducer from './slices/product/productsSlice'

export const store = configureStore({
    reducer: {
      counter: counterReducer,
      products: productReducer,
    },
  })