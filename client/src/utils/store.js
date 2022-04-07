import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './slices/categories';
import productsReducer from './slices/products';

// create our Redux store
const store = configureStore({
    reducer: {
        categories: categoriesReducer,
        products: productsReducer
    }
})

export default store;