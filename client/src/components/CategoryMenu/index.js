import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { UPDATE_CATEGORIES, UPDATE_CURRENT_CATEGORY } from '../../utils/actions';

import { useStoreContext } from '../../utils/GlobalState';

function CategoryMenu() {
  const [state, dispatch] = useStoreContext();

  const { categories } = state;

  const { data: categoryData } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
	  // has category data changed or does it exist?
	  if (categoryData) {
		  // execute dispatch function given action object
		  // set the categoryData to the global state
		  dispatch({
			  type: UPDATE_CATEGORIES,
			  categories: categoryData.categories
		  })
	  }
	  // category data is initially undefined, so once the query data is loaded, useEffect will run again
  }, [categoryData, dispatch]);

  // run the update current category action
  const handleClick = id => {
	  dispatch({
		  type: UPDATE_CURRENT_CATEGORY,
		  currentCategory: id
	  })
  }

  return (
    <div>
      <h2>Choose a Category:</h2>
      {categories.map((item) => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryMenu;
