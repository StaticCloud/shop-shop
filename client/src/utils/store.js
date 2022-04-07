// import the configure store object from the redux toolkit
import { configureStore } from '@reduxjs/toolkit';
// as well as a our reducers
import categoriesReducer from './slices/categories';
import productsReducer from './slices/products';
import currentCategoryReducer from './slices/currentCategory';
import cartReducer from './slices/cart';

// create our Redux store
const store = configureStore({
    reducer: {
        categories: categoriesReducer,
        products: productsReducer,
        currentCategory: currentCategoryReducer,
        cartInfo: cartReducer
    }
})

export default store;