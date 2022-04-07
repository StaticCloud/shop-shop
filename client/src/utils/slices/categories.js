import { createSlice } from '@reduxjs/toolkit';

// create slice for our categories property
const categorySlice = createSlice({
    name: 'categories',
    initialState: [],
    // create reducers
    reducers: {
        updateCategories: (state, action) => {
            return {
                ...state,
                categories: [...action.payload]
            }
        }
    }
});

export const { updateCategories } = categorySlice.actions;
export default categorySlice.reducer;