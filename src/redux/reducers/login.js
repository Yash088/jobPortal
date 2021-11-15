import {
  FETCH_LOGIN_REQUEST,
  FETCH_LOGIN_SUCCESS,
  FETCH_LOGIN_ERROR,
  LOGOUT
} from "../constants/login";

const initialState = {
  loginData: {},
  selectedCampaign: {},
  loginLoading: false,
  isLoginError: false,
  order: null,
  data: null
};

export default function loginReducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_LOGIN_REQUEST:
      return {
        ...state,
        loginLoading: true
      };

    case FETCH_LOGIN_SUCCESS:
      return {
        ...state,
        loginData: action.payload,
        loginLoading: false
      };

    case FETCH_LOGIN_ERROR:
      return {
        ...state,
        loginLoading: false,
        isLoginError: true,
        loginData: action.payload
      };
    case LOGOUT:
      localStorage.removeItem("token");
      localStorage.removeItem("auth");
      return {
        ...state,
        loginLoading: false,
        isLoginError: false,
        loginData: {}
      };
    default:
      return state;
  }
}
