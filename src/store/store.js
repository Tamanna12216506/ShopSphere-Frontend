import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import cartReducer from './cartSlice'
import productsReducer from './productsSlice'
import ordersReducer from './ordersSlice'
import paymentReducer from './paymentSlice'
import adminReducer from './adminSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    products: productsReducer,
    orders: ordersReducer,
    payments: paymentReducer,
    admin: adminReducer,
  },
})
