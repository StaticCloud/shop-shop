import { createSlice } from '@reduxjs/toolkit';

// create slice for our products
const productSlice = createSlice({
    name: 'products',
    initialState: [],
    reducers: {
        // update our products array
        updateProducts: (state, action) => {
            return {
                ...state,
                products: [ ...action.payload ]
            }
        }
    }
})

export const { updateProducts } = productSlice.actions;
export default productSlice.reducer;