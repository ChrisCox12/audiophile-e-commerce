import { createSlice } from "@reduxjs/toolkit";



export const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        addToCart: (state, action) => {
            state.push(action.payload)
        },
        emptyCart: (state) => {
            return []
        },
        
    }
})


export const { emptyCart } = cartSlice.actions;

export default cartSlice.reducer;