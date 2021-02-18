import { combineReducers } from 'redux';
import panesReducer from './panesReducer';
import resultsReducer from './resultsReducer';

const rootReducer = combineReducers({
  calorieLog: panesReducer,
  results: resultsReducer,
});

export default rootReducer;
