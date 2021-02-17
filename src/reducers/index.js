import { RESULTS_LOADED } from '../actions/types';

const initialState = {
  searchResults: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESULTS_LOADED:
      return {
        ...state,
        searchResults: action.payload,
      };

    default:
      return state;
  }
};

export default rootReducer;
