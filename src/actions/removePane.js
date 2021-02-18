import { REMOVE_PANE } from './types';

const removePane = (id) => ({ type: REMOVE_PANE, payload: id });

export default removePane;
