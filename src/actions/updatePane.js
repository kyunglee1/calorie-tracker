import { UPDATE_PANE } from './types';

const updatePane = (fdcId, calorieCount, portionSize) => ({
  type: UPDATE_PANE,
  payload: {
    fdcId,
    calorieCount,
    portionSize,
  },
});

export default updatePane;
