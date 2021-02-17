import { RESULTS_LOADED } from './types';

// Implement redux thunk to fetch data here
const fetchData = () => (dispatch) =>
  fetch('example.url')
    .then((res) => res.json())
    .then((data) => dispatch({ type: RESULTS_LOADED, payload: data.foods }));

export default fetchData;
