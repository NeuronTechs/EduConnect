import { AxiosError, InternalAxiosRequestConfig } from "axios";
import * as httpRequest from "./httpRequest";
import jwtDecode from "jwt-decode";
import { Store } from "@reduxjs/toolkit";
import { logoutThunk, refetchTokenStore } from "@/features/auth/authSlice";
import { User } from "@/type";
import { AppDispatch } from "@/redux/store";

const getTimeNow = (): number => {
  const date = new Date();
  const formattedDate = date.toLocaleString("en-US", {
    timeZone: "Asia/Ho_Chi_Minh",
  });

  const convertedDate = new Date(formattedDate);
  return convertedDate.getTime() / 1000;
};
// api call to get access token new
const refetchToken = async () => {
  try {
    const data = httpRequest.get("auth/refetchToken", {
      headers: { withCredentials: true },
    });
    return data;
  } catch (error) {
    Promise.reject(error);
  }
};

// config error before call api method
const handlerRequest = async (
  config: InternalAxiosRequestConfig<unknown>,
  isRefreshing: boolean,
  store: Store,
  dispatch: AppDispatch
) => {
  console.log(config);
  if (
    config.url?.includes("user/login") ||
    config.url?.includes("user/refresh") ||
    config.url?.includes("user/login/success")
  ) {
    return config;
  }

  const user: User = store.getState().authSlice?.currentUser;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const accessToken: any = jwtDecode(user?.accessToken);
  // store.dispatch(refetchTokenStore(accessToken));
  if (accessToken) {
    if (accessToken?.exp < getTimeNow()) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const data = await refetchToken();
          if (data) {
            // save redux access token new request
            const dataTemplate: User = user;
            dataTemplate.accessToken = data.accessToken;
            dispatch(refetchTokenStore(dataTemplate));
            // add token header
            config.headers.Authorization = "Bearer " + data;
          }
        } catch (error) {
          console.log(error);
        }
        isRefreshing = false;
        return config;
      }
    }
    config.headers.Authorization = "Bearer " + accessToken;
    return config;
  } else {
    console.log("request api token", accessToken);
    if (!isRefreshing) {
      isRefreshing = true;
      try {
        const data = await refetchToken();
        if (data) {
          // save redux access token new request
          const dataTemplate: User = user;
          dataTemplate.accessToken = data.accessToken;
          store.dispatch(refetchTokenStore(dataTemplate));
          // add token header
          config.headers.Authorization = "Bearer " + data;
        }
      } catch (error) {
        Promise.reject(error);
      }
      isRefreshing = false;
    }
  }

  return config;
};
// config error before call api method
const handlerResponse = (
  error: AxiosError,
  dispatch: AppDispatch,
  isRefreshing: boolean
) => {
  const { config, status } = error;
  const originalRequest = config;
  // logout system
  if (status === 401 && originalRequest?.url?.includes("auth/refresh")) {
    if (!isRefreshing) {
      dispatch(logoutThunk());
    }
  }
  return Promise.reject(error);
};

// interceptor setup
export const setupInterceptor = (store: Store, dispatch: AppDispatch): void => {
  const isRefreshing: boolean = false;

  //           isRefreshing = true;
  httpRequest.default.interceptors.request.use(
    (config) => handlerRequest(config, isRefreshing, store, dispatch),
    (error: AxiosError): Promise<AxiosError> => {
      return Promise.reject(error);
    }
  );
  httpRequest.default.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      handlerResponse(error, dispatch, isRefreshing);
    }
  );
};
