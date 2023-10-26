import axios from "axios";
import { AxiosRequestHeaders } from "axios";
const instance = axios.create({
  baseURL: "http://localhost:3000/v1",
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

export const get = async (path: string, options = {}) => {
  try {
    const response = await instance.get(path, options);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const post = async (
  path: string,
  options = {},
  header?: AxiosRequestHeaders
) => {
  try {
    const response = await instance.post(path, options, {
      headers: header,
    });

    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const put = async (
  path: string,
  options = {},
  header: AxiosRequestHeaders
) => {
  try {
    const response = await instance.put(path, options, {
      headers: header,
    });
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default instance;
