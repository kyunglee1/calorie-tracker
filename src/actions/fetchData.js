import { RESULTS_LOADED } from './types';
import getUrl from '../helper/getUrl';

/* Action creator that performs async fetch.
   Given food-item search query, fetch related 
   results and dispatch to Redux store. */

const fetchData = (foodItem) => (dispatch) => {
  const searchQuery = foodItem.trim();
  if (!searchQuery) return;

  fetch(getUrl(searchQuery))
    .then((res) => res.json())
    .then((data) => dispatch({ type: RESULTS_LOADED, payload: data.foods }));
};

export default fetchData;
