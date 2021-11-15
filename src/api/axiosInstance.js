/**
 * src/api/axiosinstance.js
 */
import axios from "axios";
import qs from "qs";
import { BASE_URL } from "../constants";
/**
 *
 * parse error response
 */

function parseError(messages) {
  // error
  if (messages) {
    if (messages instanceof Array) {
      return Promise.reject({ messages });
    }
    return Promise.reject({ messages: [messages] });
  }
  return Promise.reject({ messages: ["got errors"] });
}

/**
 * parse response
 */
function parseBody(response) {
  //  if (response.status === 200 && response.data.status.code === 200) { // - if use custom status code
  if (response.status === 200) {
    return response;
  } else if (response.status === 401) {
    // getNewAccessToken();
  } else {
    return parseError(response.data.messages);
  }
}

/**
 * axios instance
 */
const instance = axios.create({
  timeout: 15000,
  baseURL: `${BASE_URL}`,
  paramsSerializer(params) {
    return qs.stringify(params, { indices: false });
  }
});

// request header
instance.interceptors.request.use(
  (config) => {
    config.headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
    return config;
  },
  (error) => Promise.reject(error)
);

// response parse
instance.interceptors.response.use(
  (response) => parseBody(response),
  (error) => {
    return Promise.reject(error);
  }
);

export const http = instance;
