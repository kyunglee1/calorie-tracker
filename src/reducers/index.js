import { combineReducers } from 'redux';
import panesReducer from './panesReducer';
import resultsReducer from './resultsReducer';

const rootReducer = combineReducers({
  calorieLog: panesReducer, // Holds calorie-log panes
  results: resultsReducer, // Holds search results
});

export default rootReducer;
