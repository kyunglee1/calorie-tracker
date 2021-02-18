import {
  RESULTS_LOADED,
  ADD_PANE,
  REMOVE_PANE,
  UPDATE_PANE,
  SIGNAL_DUPLICATE,
  END_SIGNAL,
} from '../actions/types';

let panes = [];
const storedPanes = localStorage.getItem('panes');

if (storedPanes) {
  panes = JSON.parse(storedPanes);
}

const initialState = {
  searchResults: [],
  panes,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESULTS_LOADED:
      return {
        ...state,
        searchResults: action.payload,
      };

    case ADD_PANE:
      return {
        ...state,
        panes: [...state.panes, action.payload],
      };

    case REMOVE_PANE:
      return {
        ...state,
        panes: state.panes.filter((pane) => pane.fdcId !== action.payload),
      };

    case UPDATE_PANE:
      return {
        ...state,
        panes: state.panes.map((pane) =>
          // Find target pane to update
          pane.fdcId === action.payload.fdcId
            ? {
                ...pane,
                // Update the fields below
                calorieCount: action.payload.calorieCount,
                portionSize: action.payload.portionSize,
              }
            : pane
        ),
      };

    case SIGNAL_DUPLICATE:
      return {
        ...state,
        // Add type: 'duplicate' to pre-existing pane to trigger blink-effect
        panes: state.panes.map((pane) =>
          pane.fdcId === action.payload ? { ...pane, type: 'duplicate' } : pane
        ),
      };

    case END_SIGNAL:
      return {
        ...state,
        // Remove type: 'duplicate' to pre-existing pane to end blink-effect
        panes: state.panes.map((pane) =>
          pane.fdcId === action.payload ? { ...pane, type: '' } : pane
        ),
      };

    default:
      return state;
  }
};

export default rootReducer;
