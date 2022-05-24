import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import { productApi } from './productApi';


export const store = configureStore({
    reducer: {
        cart: cartReducer,
        [productApi.reducerPath]: productApi.reducer
    }
});

