import React from 'react';

import { idbPromise } from '../../utils/helpers';

// dispatch
import { useDispatch } from 'react-redux';
// import cart actions
import { removeFromCart, updateQuantity } from '../../utils/slices/cart';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const removeItemFromCart = item => {
    // remove the item from the cart using our reducer
    dispatch(removeFromCart({ _id: item._id }));
    idbPromise('cart', 'delete', { ...item });
  }

  const onChange = (e) => {
    const value = e.target.value;
  
    if (value === '0') {
      // remove from cart if quantity is zero
      dispatch(removeFromCart({ _id: item._id}));
      idbPromise('cart', 'delete', { ...item })
    } else {
      // update quantity if modified inside the cart
      dispatch(updateQuantity({ _id: item._id, purchaseQuantity: parseInt(value) }))
      idbPromise('cart', 'put', { ...item, purchaseQuantity: parseInt(value) });
    }
  };

  return (
    <div className="flex-row">
      <div>
        <img
          src={`/images/${item.image}`}
          alt=""
        />
      </div>
      <div>
        <div>{item.name}, ${item.price}</div>
        <div>
          <span>Qty:</span>
          <input
            type="number"
            placeholder="1"
            value={item.purchaseQuantity}
            onChange={onChange}
          />
          <span
            role="img"
            aria-label="trash"
            onClick={() => removeItemFromCart(item)}
          >
            🗑️
          </span>
        </div>
      </div>
    </div>
  );
}

export default CartItem;