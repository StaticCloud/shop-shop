import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';

import ProductItem from '../ProductItem';
import { QUERY_PRODUCTS } from '../../utils/queries';
import spinner from '../../assets/spinner.gif';

import { idbPromise } from '../../utils/helpers';

// selector, dispatch, and products action
import { useSelector, useDispatch } from 'react-redux';
import { updateProducts } from '../../utils/slices/products'

function ProductList() {
  // selectors
  const productSelector = useSelector(state => state.products);
  const currentCategorySelector = useSelector(state => state.currentCategory);

  // get the products array and the current category
  const products = productSelector.products;
  const currentCategory = currentCategorySelector.currentCategory;

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  const dispatch = useDispatch();

  useEffect(() => {
	  // does data exist?
    if (data) {
      // load the data into the global products array
      dispatch(updateProducts(data.products))

      // add products to idb
      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      })
      // if the useQuery() hook isn't trying to establish a connection (in other words, if we're offline)...
     } else if (!loading) {
      idbPromise('products', 'get').then((products) => {
        dispatch(updateProducts(products))
      })
    }
  }, [data, loading, dispatch])

  // filter the products based on the current category
  function filterProducts() {
    if (!currentCategory) {
      return products;
    }

    return products.filter(product => product.category._id === currentCategory);
  }

  return (
    <div className="my-2">
      <h2>Our Products:</h2>
      {products ? (
        <div className="flex-row">
          {filterProducts().map((product) => (
            <ProductItem
              key={product._id}
              _id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default ProductList;
