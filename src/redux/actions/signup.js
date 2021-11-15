import {
  FETCH_SIGNUP_REQUEST,
  FETCH_SIGNUP_SUCCESS,
  FETCH_SIGNUP_ERROR
} from "../constants/signup";

export function signup(req) {
  return {
    type: FETCH_SIGNUP_REQUEST,
    payload: req
  };
}

export function signupSuccess(req) {
  return {
    type: FETCH_SIGNUP_SUCCESS,
    payload: req
  };
}

export function signupError(req) {
  return {
    type: FETCH_SIGNUP_ERROR,
    payload: req
  };
}
