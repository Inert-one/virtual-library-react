import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOAD_USER,
  LOGOUT_USER,
} from "../_actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    case REGISTER_USER:
      return action.payload;
    case LOGIN_USER:
      return action.payload;
    case LOAD_USER:
      return action.payload;
    case AUTH_USER:
      return action.payload;
    case LOGOUT_USER:
      return null;
    default:
      return state;
  }
}
