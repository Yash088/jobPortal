import { fork, all } from "redux-saga/effects";
import { map, unary } from "lodash/fp";
import loginSaga from "./saga/login";
import signupSaga from "./saga/signup";

export default function* () {
  const _sagas = [loginSaga, signupSaga];

  yield all(map(unary(fork), _sagas));
}
