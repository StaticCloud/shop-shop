import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_CATEGORIES } from '../../utils/queries';

import { idbPromise } from '../../utils/helpers';

import { useSelector, useDispatch } from 'react-redux';

import { updateCategories } from '../../utils/slices/categories'

function CategoryMenu() {
  // reference our dispatch function
  const dispatch = useDispatch();

  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  // select our category data
  const categoriesSelector = useSelector(state => state.categories);

  // get the categories
  const categories = categoriesSelector.categories;

  useEffect(() => {
	  // has category data changed or does it exist?
	  if (categoryData) {
		  // execute dispatch function given action object
		  // set the categoryData to the global state

      // use our dispatch function to the slice action for our categories
		  dispatch(updateCategories(categoryData.categories))

      // save category data to idb
      categoryData.categories.forEach(category => {
        idbPromise('categories', 'put', category)
      })
    // if we're offline, load categories from idb and save to global object
	  } else if (!loading) {
      idbPromise('categories', 'get').then(categories => {
        dispatch(updateCategories(categories))
      })
    }
	  // category data is initially undefined, so once the query data is loaded, useEffect will run again
  }, [categoryData, loading, dispatch]);

  // run the update current category action
  const handleClick = id => {
	  
  }

  return (
    <div>
      <h2>Choose a Category:</h2>
        {categories ? 
          (categories.map((item) => (
            <button
              key={item._id}
              onClick={() => {
                handleClick(item._id);
              }}>
              {item.name}
            </button>
          ))
        ) : (
          <i>Loading...</i>
        )}
    </div>
  );
}

export default CategoryMenu;
