import { UPDATE_PANE } from './types';

const updatePane = (id, calorieCount, portionSize) => ({
  type: UPDATE_PANE,
  payload: {
    fdcId: id,
    calorieCount,
    portionSize,
  },
});

export default updatePane;
