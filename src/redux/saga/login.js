import { takeLatest, put, call } from "redux-saga/effects";
import api from "../../api/api";
import { FETCH_LOGIN_REQUEST } from "../constants/login";
import { loginSuccess, loginError } from "../actions/login";

function* login(action) {
  try {
    const res = yield call(api.post, "auth/login", {
      email: action.payload.email,
      password: action.payload.password
    });
    yield put(loginSuccess(res.data));
    localStorage.setItem("token", res.data.data.token);
    localStorage.setItem("auth", res.data.data.userRole);
    action.payload.cb && action.payload.cb(res.data);
  } catch (e) {
    yield put(loginError(e.response.data));
    action.payload.cb && action.payload.cb(e.response.data);
  }
}

export default function* () {
  yield takeLatest(FETCH_LOGIN_REQUEST, login);
}
