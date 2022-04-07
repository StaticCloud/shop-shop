import { createSlice } from '@reduxjs/toolkit';

const currentCategorySlice = createSlice({
    name: 'currentCategory',
    initialState: '',
    reducers: {
        setCurrentCategory: (state, action) => {
            return {
                ...state,
                currentCategory: action.payload
            }
        }
    }
})

export const { setCurrentCategory } = currentCategorySlice.actions;
export default currentCategorySlice.reducer;