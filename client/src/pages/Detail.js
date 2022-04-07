import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_PRODUCTS } from '../utils/queries';
import spinner from '../assets/spinner.gif';

import { idbPromise } from '../utils/helpers';

import Cart from '../components/Cart';

import { updateQuantity, removeFromCart, addToCart } from '../utils/slices/cart';
import { updateProducts } from '../utils/slices/products';
import { useSelector, useDispatch } from 'react-redux';

function Detail() {
  // get cart and products selector
  const cartSelector = useSelector(state => state.cartInfo);
  const productSelector = useSelector(state => state.products);

  const products = productSelector.products;
  const cart = cartSelector.cart;

  console.log(cartSelector)
  console.log(cart);

  const dispatch = useDispatch();

  const { id } = useParams();

  const [currentProduct, setCurrentProduct] = useState({});

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  const addItemToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id)

    if (itemInCart) {
      // update quantity of item if it's already in the cart
      dispatch(updateQuantity({ _id: id, purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1 }))
      
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
	  } else {
      // if it doesn't already exist in the cart, add it
      dispatch(addToCart({ 
        product: { ...currentProduct, purchaseQuantity: 1 }
      }));

      idbPromise('cart', 'put', { ...currentProduct, purchaseQuantity: 1 });
	  }
  }

  const removeItemFromCart = () => {
    dispatch(removeFromCart({ _id: id }))
    idbPromise('cart', 'delete', { ...currentProduct });
  }

  useEffect(() => {
    // is there data in our global state's products array?
    if (products) {
      setCurrentProduct(products.find((product) => product._id === id));
    } else if (data) {
      // load products into the global object
      // if this is the first page the user visits, there will be no products saved in the global state and the first statement will not work, which is why we have this statement
      dispatch(updateProducts(data.products))

      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    // if we're offline, load product data to the global object from idb
    } else if (!loading) {
      idbPromise('products', 'get').then((indexedProducts) => {
        dispatch(updateProducts(indexedProducts))
      });
    }
    // this is what we call a dependency array
  }, [cart, products, loading, data, dispatch, id]);

  return (
    <>
      {currentProduct ? (
        <div className="container my-1">
          <Link to="/">← Back to Products</Link>

          <h2>{currentProduct.name}</h2>

          <p>{currentProduct.description}</p>

          <p>
            <strong>Price:</strong>${currentProduct.price}{' '}
            <button onClick={addItemToCart}>Add to Cart</button>
            <button 
				    // disable if the item doesn't exist inside the cart
            disabled={!cart.find(p => p._id === id)}
            onClick={removeItemFromCart}
            >Remove from Cart</button>
          </p>

          <img
            src={`/images/${currentProduct.image}`}
            alt={currentProduct.name}
          />
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
      <Cart/>
    </>
  );
}

export default Detail;
