import {
  FETCH_SIGNUP_REQUEST,
  FETCH_SIGNUP_SUCCESS,
  FETCH_SIGNUP_ERROR
} from "../constants/signup";

const initialState = {
  signupData: {},
  selectedCampaign: {},
  signupLoading: false,
  isLoginError: false,
  order: null,
  data: null
};

export default function signupReducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_SIGNUP_REQUEST:
      return {
        ...state,
        signupLoading: true
      };

    case FETCH_SIGNUP_SUCCESS:
      return {
        ...state,
        signupData: action.payload,
        signupLoading: false
      };

    case FETCH_SIGNUP_ERROR:
      return {
        ...state,
        signupLoading: false,
        isLoginError: true,
        signupData: action.payload
      };

    default:
      return state;
  }
}
