import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cartInfo',
    initialState: {
        cart: [],
        cartOpen: false
    },
    reducers: {
        // add to the cart if and make it open
        addToCart: (state, action) => {
            return {
                ...state,
                cartOpen: true,
                cart: [ ...state.cart, action.payload.product ] 
            };
        },
        // add multiple products to the cart
        addMultipleToCart: (state, action) => {
            return {
                ...state,
                cart: [ ...action.payload.products ]
            }
        },
        // update the quantity of a product given and id and a purchase quantity
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
        // toggle the open state of the cart
        toggleCart: (state, action) => {
            return {
                ...state,
                cartOpen: !state.cartOpen
            }
        },
        // remove an item from the cart
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