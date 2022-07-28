import * as Actions from "../actionTypes";
import { updateObj } from "../utils";

var initialState = {
  panics: []
};

var reducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.PANIC_GENERATION:
      if (action.panic != null) {
        state = updateObj(state, { panics: state.panics.concat(action.panic) });
      }
      case Actions.GET_OPERATOR_ASSIGNMENT:
      if (action.panic != null) {
        state = updateObj(state, { panics: action.panics });
      }
  }
  return state;
};

export default reducer;
