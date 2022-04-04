import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_PRODUCTS } from '../utils/queries';
import spinner from '../assets/spinner.gif';

import { useStoreContext } from "../utils/GlobalState";
import { 
  UPDATE_PRODUCTS,
  REMOVE_FROM_CART,
  ADD_TO_CART,
  UPDATE_CART_QUANTITY
} from "../utils/actions";

import Cart from '../components/Cart';

function Detail() {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  const [currentProduct, setCurrentProduct] = useState({});

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  const { products, cart } = state;

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id)

    if (itemInCart) {
		dispatch({
			type: UPDATE_CART_QUANTITY,
			_id: id,
		  	purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
		});
	} else {
		dispatch({
		  	type: ADD_TO_CART,
		  	product: { ...currentProduct, purchaseQuantity: 1 }
		});
	}
  }

  const removeFromCart = () => {
	  dispatch({
		  type: REMOVE_FROM_CART,
		  _id: currentProduct._id
	  })
  }

  useEffect(() => {
    // is there data in our global state's products array?
    if (products.length) {
      setCurrentProduct(products.find((product) => product._id === id));
    } else if (data) {
      // load products into the global object
      // if this is the first page the user visits, there will be no products saved in the global state and the first statement will not work, which is why we have this statement
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products
      })
    }
    // this is what we call a dependency array
  }, [products, data, dispatch, id]);

  return (
    <>
      {currentProduct ? (
        <div className="container my-1">
          <Link to="/">← Back to Products</Link>

          <h2>{currentProduct.name}</h2>

          <p>{currentProduct.description}</p>

          <p>
            <strong>Price:</strong>${currentProduct.price}{' '}
            <button onClick={addToCart}>Add to Cart</button>
            <button 
				// disable if the item doesn't exist inside the cart
				disabled={!cart.find(p => p._id === currentProduct._id)}
				onClick={removeFromCart}
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
