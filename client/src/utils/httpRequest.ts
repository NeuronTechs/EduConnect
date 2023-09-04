import axios from "axios";
import { AxiosRequestHeaders } from "axios";
const instance = axios.create({
  baseURL: "http://localhost:3240/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const get = async (path: string, options = {}) => {
  const response = await instance.get(path, options);
  return response.data;
};

export const post = async (
  path: string,
  options = {},
  header?: AxiosRequestHeaders
) => {
  const response = await instance.post(path, options, {
    headers: header,
  });

  return response.data;
};

export const put = async (
  path: string,
  options = {},
  header: AxiosRequestHeaders
) => {
  const response = await instance.put(path, options, {
    headers: header,
  });
  return response.data;
};

export default instance;
