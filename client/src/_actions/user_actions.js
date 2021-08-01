import axios from "axios";
import { URL_API } from "utils/URL_API";
import { LOGIN_USER, LOGOUT_USER, LOAD_USER } from "./types";

export function registerUser(dataToSubmit) {
  return (dispatch) => {
    axios
      .post(URL_API.REGISTER, dataToSubmit)
      .then((res) => {
        const { username, password } = dataToSubmit;
        dispatch(loginUser({ username, password }));
      })
      .catch((error) => {
        alert("Sign Up Error: Wrong username or password");
      });
  };
}

export function loginUser(dataToSubmit) {
  return (dispatch) => {
    axios
      .post(URL_API.LOGIN, dataToSubmit)
      .then((res) => {
        dispatch({
          type: LOGIN_USER,
          payload: res.data,
        });
        localStorage.setItem("user", JSON.stringify(res.data));
        window.location.reload();
      })
      .catch((error) => {
        alert("Sign In Error: Wrong username or password");
      });
  };
}
export function loadSessionData() {
  const data = JSON.parse(localStorage.getItem("user"));
  return {
    type: LOAD_USER,
    payload: data,
  };
}

export function logoutUser() {
  window.location.reload();
  return {
    type: LOGOUT_USER,
  };
}
