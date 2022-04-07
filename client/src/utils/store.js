import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './slices/categories';
import productsReducer from './slices/products';
import currentCategoryReducer from './slices/currentCategory';

// create our Redux store
const store = configureStore({
    reducer: {
        categories: categoriesReducer,
        products: productsReducer,
        currentCategory: currentCategoryReducer
    }
})

export default store;