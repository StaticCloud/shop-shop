import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cartInfo',
    initialState: {
        cart: [],
        cartOpen: false
    },
    reducers: {
        addToCart: (state, action) => {
            return {
                ...state,
                cartOpen: action.payload.cartOpen,
                cart: [ ...state.cart, action.payload.product]
            };
        },
        toggleCart: (state, action) => {
            return {
                ...state,
                cartOpen: !state.cartOpen
            }
        }
    }
})

export const { addToCart, toggleCart } = cartSlice.actions;
export default cartSlice.reducer;