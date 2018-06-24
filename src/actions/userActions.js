import { USER_LOGIN, USER_LOGOUT } from "actions/types";

export function login(user) {
  return {
    type: USER_LOGIN,
    payload: {
      user
    }
  };
}

export function logout() {
  return {
    type: USER_LOGOUT
  };
}
