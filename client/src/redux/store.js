import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import { productApi } from './productApi';
import { orderApi } from './orderApi';


export const store = configureStore({
    reducer: {
        cart: cartReducer,
        [productApi.reducerPath]: productApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer
    }
});

