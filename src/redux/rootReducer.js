import { combineReducers } from "redux";
import loginReducer from "./reducers/login";
import signupReducer from "./reducers/signup";

const rootReducer = combineReducers({
  login: loginReducer,
  signup: signupReducer
});

export default rootReducer;
