import { createSlice } from "@reduxjs/toolkit";



export const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        addItem: (state, action) => {
            if(state.length > 0) {
                const item = state.find(itm => itm.slug === action.payload.slug);

                if(item) {
                    if(item.quantity < 10 && (item.quantity + action.payload.quantity) < 10) {
                        item.quantity += action.payload.quantity;
                    }
                    else {
                        item.quantity = 10;
                    }
                }
                else {
                    state.push(action.payload);
                }
            }
            else {
                state.push(action.payload);
            }
        },
        emptyCart: (state) => {
            return [];
        },
        incrementItem: (state, action) => {
            const slug = action.payload;
            const item = state.find(itm => itm.slug === slug);
            
            if(item) item.quantity += 1;
        },
        decrementItem: (state, action) => {
            const slug = action.payload;
            const item = state.find(itm => itm.slug === slug);

            if(item) item.quantity -= 1;
        },
        removeItem: (state, action) => {
            const slug = action.payload;

            return state.filter(item => item.slug !== slug);
        }
    }
})


export const { addItem, emptyCart, incrementItem, decrementItem, removeItem } = cartSlice.actions;

export default cartSlice.reducer;