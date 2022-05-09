import axios from "axios";
import { async } from "q";

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
    method: "POST",
    others: {},
  }
) => {
  const URL = uri_api + url;

  const headers = params.headers || {};
  const token = "74b3a142d0b9e4214df92f9cdb133f2e";

  const res = await _axios.request({
    url: URL + `&appid=${token}`,
    method: "GET",

    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`,
      ...headers,
    },
    mode: "cors",
    data: data,
    ...params.others,
  });

  return res;
};

export default fetchData;
