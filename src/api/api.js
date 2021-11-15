import querystring from "query-string";
import { BASE_URL } from "../constants";
import { http } from "./axiosInstance";

const API_ENDPOINT = BASE_URL;

function request(props) {
  const { url, init, query, option } = props;
  const strQuery = query ? `?${querystring.stringify(query)}` : "";
  const fetchUrl = `${API_ENDPOINT}/${url}${strQuery}`;
  if (init.method === "POST") {
    return http.post(fetchUrl, option);
  } else if (init.method === "PATCH") {
    return http.patch(fetchUrl, option);
  } else if (init.method === "DELETE") {
    return http.delete(fetchUrl, option);
  }
  return http.get(fetchUrl, { params: option });
}

const Api = {
  get: (url, option) =>
    request({
      url,
      init: {
        method: "GET"
      },
      option
    }),

  delete: (url, option) =>
    request({
      url,
      init: {
        method: "DELETE"
      },
      option
    }),

  post: (url, option) =>
    request({
      url,
      init: {
        method: "POST"
      },
      option
    }),
  patch: (url, option) =>
    request({
      url,
      init: {
        method: "PATCH"
      },
      option
    })
};

export default Api;
