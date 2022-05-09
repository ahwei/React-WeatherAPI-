import axios from "axios";

export const uri_api = "https://api.openweathermap.org/";

export const _axios = axios.create({
  baseURL: uri_api,
  timeout: 5000,
});

const fetchData = async (
  url,
  data,
  params = {
    headers: {},
    method: "GET",
    others: {},
  }
) => {
  const URL = url;

  const headers = params.headers || {};
  const token = "74b3a142d0b9e4214df92f9cdb133f2e";

  return _axios.request({
    url: URL + `&appid=${token}`,
    method: params.method || "GET",

    headers: {
      // "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`,
      ...headers,
    },
    mode: "cors",
    data: params.method == "GET" ? null : data,
  });
};

export default fetchData;
