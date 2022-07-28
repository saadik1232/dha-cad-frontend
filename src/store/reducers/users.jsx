import * as Actions from "../actionTypes";
import { updateObj } from "../utils";

var initialState = {
  loginUser: null,
  decodedToken: null
};

var reducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.USER_LOGIN:
      state = updateObj(state, { loginUser: action.user });
      console.log(state);
    case Actions.DECODE_JWT:
      if (action.token == null) {
        state = updateObj(state, { decodedToken: null, loginUser: null });
        console.log(state);
      } else {
        state = updateObj(state, { decodedToken: action.token });
      }
  }
  return state;
};

export default reducer;
