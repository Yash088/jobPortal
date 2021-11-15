import {
  FETCH_LOGIN_REQUEST,
  FETCH_LOGIN_SUCCESS,
  FETCH_LOGIN_ERROR,
  LOGOUT
} from "../constants/login";

export function login(req) {
  return {
    type: FETCH_LOGIN_REQUEST,
    payload: req
  };
}

export function loginSuccess(req) {
  return {
    type: FETCH_LOGIN_SUCCESS,
    payload: req
  };
}

export function loginError(req) {
  return {
    type: FETCH_LOGIN_ERROR,
    payload: req
  };
}

export function logout(req) {
  return {
    type: LOGOUT,
    payload: req
  };
}
