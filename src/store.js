import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import localStorageMiddleware from './middleware/localStorageMiddleware';
import rootReducer from './reducers/index';

const store = createStore(
  rootReducer,
  applyMiddleware(localStorageMiddleware, thunk)
);

export default store;
