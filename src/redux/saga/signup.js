import { takeLatest, put, call } from "redux-saga/effects";
import api from "../../api/api";
import { FETCH_SIGNUP_REQUEST } from "../constants/signup";
import { signupSuccess, signupError } from "../actions/signup";

function* signup(action) {
  try {
    const res = yield call(api.post, "auth/register", {
      email: action.payload.email,
      password: action.payload.password,
      confirmPassword: action.payload.confirmPassword,
      name: action.payload.name,
      skills: action.payload.skill,
      userRole: action.payload.userRole
    });
    

    console.log(res);
    yield put(signupSuccess(res.data));
    localStorage.setItem("token", res.data.data.token);
    localStorage.setItem("auth", res.data.data.userRole);
    action.payload.cb && action.payload.cb(res.data);
  } catch (e) {
    console.log(e);
    yield put(signupError(e.response.data));
    action.payload.cb && action.payload.cb(e.response.data);
  }
}

export default function* () {
  yield takeLatest(FETCH_SIGNUP_REQUEST, signup);
}
