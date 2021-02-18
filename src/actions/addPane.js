import { ADD_PANE } from './types';

const addPane = (pane) => ({
  type: ADD_PANE,
  payload: pane,
});

export default addPane;
