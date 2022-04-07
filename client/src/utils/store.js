import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './slices/categories';

// create our Redux store
const store = configureStore({
    reducer: {
        categories: categoriesReducer
    }
})

export default store;