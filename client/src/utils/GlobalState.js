import React, { createContext, useContext } from 'react';
import { useProductReducer } from './reducers';

// instantiate the global state object
const StoreContext = createContext();
const { Provider } = StoreContext;

// providers are react components that allow state data passed into it useable in other components
// consumer accessed data that the provider holds

// instantiate the initial global state
const StoreProvider = ({ value = [], ...props }) => {
    // state = the most recent version of our global state
    // dispatch = the function we use to update our state given an action object
    const [state, dispatch] = useProductReducer({
        products: [],
        cart: [],
        cartOpen: false,
        categories: [],
        currentCategory: '',
    })

    console.log(state);
    return <Provider value={[state, dispatch]} {...props}/>;
}

const useStoreContext = () => {
    return useContext(StoreContext);
}

// 22.1.5 Great, everything for our global state object...
export { StoreProvider, useStoreContext };