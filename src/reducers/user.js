import { USER_LOGIN, USER_LOGOUT } from "actions/types";

const initialState = {
  isLoggedIn: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        ...action.payload.user
      };
    case USER_LOGOUT:
      return {
        ...state,
        isLoggedIn: false
      };
    default:
      return state;
  }
};
