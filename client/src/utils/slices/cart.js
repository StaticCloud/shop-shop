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
                cartOpen: true,
                cart: [ ...state.cart, action.payload.product]
            };
        },
        addMultipleToCart: (state, action) => {
            return {
                ...state,
                cart: [ ...action.payload.products ]
            }
        },
        updateQuantity: (state, action) => {
            return {
                ...state,
                cartOpen: true,
                cart: state.cart.map(item => {
                    if (item._id === action.payload._id) {
                        return { 
                            ...item, 
                            purchaseQuantity: action.payload.purchaseQuantity
                        }
                    }
                    return item;
                })
            }
        },
        toggleCart: (state, action) => {
            return {
                ...state,
                cartOpen: !state.cartOpen
            }
        },
        removeFromCart: (state, action) => {
            let newCart = state.cart.filter(item => item._id != action.payload._id);

            return {
                ...state,
                cart: newCart
            }
        }
    }
})

export const { addToCart, toggleCart, addMultipleToCart, updateQuantity, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;