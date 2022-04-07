import React from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers"

import { useStoreContext } from '../../utils/GlobalState';
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';

import { idbPromise } from '../../utils/helpers';

import { addToCart, updateQuantity } from '../../utils/slices/cart';
import { useSelector, useDispatch } from 'react-redux';

function ProductItem(item) {
  // access the cart from the global state
  const cartSelector = useSelector(state => state.cartInfo)
  const dispatch = useDispatch();

  const cart = cartSelector.cart;

  const {
    image,
    name,
    _id,
    price,
    quantity
  } = item;

  const addItemToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id);

    // if the item we're adding already exists in the cart...
    if (itemInCart) {
      // update the respective item's purchase quantity
      dispatch(updateQuantity({ 
        _id: _id, 
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1 
      }))

      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      // otherwise simply add it into the cart
      dispatch(addToCart({ 
        product: { ...item, purchaseQuantity: 1 } 
      }))
      idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
    }
  }

  return (
    <div className="card px-1 py-1">
      <Link to={`/products/${_id}`}>
        <img
          alt={name}
          src={`/images/${image}`}
        />
        <p>{name}</p>
      </Link>
      <div>
        <div>{quantity} {pluralize("item", quantity)} in stock</div>
        <span>${price}</span>
      </div>
      <button onClick={addItemToCart}>Add to cart</button>
    </div>
  );
}

export default ProductItem;
