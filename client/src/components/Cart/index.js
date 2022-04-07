import React, { useEffect } from 'react';
import CartItem from '../CartItem';
import Auth from '../../utils/auth';
import './style.css';

import { idbPromise } from '../../utils/helpers';

import { QUERY_CHECKOUT } from '../../utils/queries';
import { loadStripe } from '@stripe/stripe-js';

import { useLazyQuery } from '@apollo/client';

// selector dispatch
import { useSelector, useDispatch } from 'react-redux';
// cart reducers
import { toggleCart, addMultipleToCart } from '../../utils/slices/cart';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const Cart = () => {
    // access the cart from the global state
    const cartSelector = useSelector(state => state.cartInfo)
    const dispatch = useDispatch();

    // get the cart and cartopen values from the selector
    const cart = cartSelector.cart;
    const cartOpen = cartSelector.cartOpen;

    const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

    useEffect(() => {
        // load cart from idb
        async function getCart() {
            const idbCart = await idbPromise('cart', 'get');
            dispatch(addMultipleToCart({ products: [...idbCart] }))
        }

        // load cart from idb if the state cart object is empty
        if (!cart.length) {
            getCart();
        }
    }, [cart.length, dispatch]);

    useEffect(() => {
        if (data) {
            stripePromise.then((res) => {
                res.redirectToCheckout({ sessionId: data.checkout.session })
            })
        }
    }, [data])

    function calculateTotal() {
        let sum = 0;
        cart.forEach(item => {
            sum += item.price * item.purchaseQuantity;
        })
        return sum.toFixed(2);
    }

    function submitCheckout() {
        const productIds = [];

        cart.forEach((item) => {
            for (let i = 0; i < item.purchaseQuantity; i++) {
                productIds.push(item._id);
            }
        })

        getCheckout({
            variables: { products: productIds }
        })
    }

    // toggle the cart
    function toggle() {
        dispatch(toggleCart())
    }

    // if the cart is not open, display the cart
    if (!cartOpen) {
        return (
            <div className="cart-closed" onClick={toggle}>
                <span
                    role="img"
                    aria-label="trash">🛒</span>
            </div>
        );
    }

    return (
      <div className="cart">
        <div className="close" onClick={toggle}>[close]</div>
        <h2>Shopping Cart</h2>
        {cart.length ? (
            <div>
                {cart.map(item => (
                    <CartItem key={item._id} item={item}/>
                ))}
                <div className="flex-row space-between">
                    <strong>Total: ${calculateTotal()}</strong>
                    {
                        Auth.loggedIn() ?
                        <button onClick={submitCheckout}>
                            Checkout
                        </button>
                        :
                        <span>(log in to check out)</span>
                    }
                </div>
            </div>
        ) : (
            <h3>
                <span role="img" aria-label="shocked">
                    😱
                </span>
                You haven't added anything to your cart yet!
            </h3>
        )}
      </div>
    );
  };
  
  export default Cart;