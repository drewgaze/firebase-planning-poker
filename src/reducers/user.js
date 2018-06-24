import { USER_LOGIN, USER_LOGOUT } from "actions/types";

const initialState = {
  isLoggedIn: false,
  user: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload.user
      };
    case USER_LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: {}
      };
    default:
      return state;
  }
};
