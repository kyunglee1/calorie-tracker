/* eslint-disable no-useless-return */
import { ADD_PANE, UPDATE_PANE, REMOVE_PANE } from '../actions/types';

const localStorageMiddleware = (storeAPI) => (next) => (action) => {
  const isPaneAction = action.type === (ADD_PANE || UPDATE_PANE || REMOVE_PANE);

  // Dispatch action to update store
  const result = next(action);

  // Store updated panes into localStorage
  if (isPaneAction) {
    localStorage.setItem('panes', JSON.stringify(storeAPI.getState().panes));
  }

  return result;
};

export default localStorageMiddleware;
