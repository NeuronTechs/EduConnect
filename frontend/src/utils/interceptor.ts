import { AxiosError } from "axios";
import * as httpRequest from "./httpRequest";
import jwtDecode from "jwt-decode";
import { Store } from "@reduxjs/toolkit";
import { logoutThunk, refetchTokenStore } from "@/features/auth/authSlice";
import { User } from "@/type";
import { AppDispatch } from "@/redux/store";

interface IAccessToken {
  exp: number;
  iat: number;
  userId: string;
  username: string;
  role: string;
  fullName: string;
  createdAt: string;
  updatedAt: string;
  avatar: string;
  phone: string;
  email: string;
  accessToken: string;
}
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
    const data = await httpRequest.get("user/refreshToken", {
      headers: { withCredentials: true },
    });
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

// interceptor setup
export const setupInterceptor = (store: Store, dispatch: AppDispatch): void => {
  let isRefreshing: boolean = false;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let refreshPromise: Promise<any> | null = null;
  //           isRefreshing = true;
  refreshPromise = null;
  isRefreshing = false;

  // handle request call aceess token
  httpRequest.default.interceptors.request.use(
    async (config) => {
      if (config.url?.includes("user/refreshToken")) {
        return config;
      }

      if (config.url?.includes("user/logout")) {
        return config;
      }

      if (config.url?.includes("user/register")) {
        return config;
      }
      const user: User = store.getState().authSlice?.currentUser;

      // store.dispatch(refetchTokenStore(accessToken));
      if (user?.accessToken) {
        const accessToken: IAccessToken = jwtDecode(user?.accessToken);
        if (accessToken?.exp < getTimeNow()) {
          if (!isRefreshing) {
            isRefreshing = true;
            try {
              if (!refreshPromise) {
                refreshPromise = refetchToken();
              }
              const data = await refreshPromise;
              if (data) {
                const dataTemplate: User = {
                  ...user,
                  accessToken: data.accessToken,
                };
                dispatch(refetchTokenStore(dataTemplate));
                config.headers.Authorization = "Bearer " + data.accessToken;
              }
            } catch (error) {
              console.log(error);
            }
            isRefreshing = false;
            refreshPromise = null;
            return config;
          }
        }
        config.headers.Authorization = "Bearer " + user.accessToken;
      } else {
        if (!isRefreshing) {
          isRefreshing = true;
          try {
            if (!refreshPromise) {
              refreshPromise = refetchToken();
            }
            const data = await refreshPromise;
            if (data) {
              const dataTemplate: User = {
                ...user,
                accessToken: data.accessToken,
              };
              store.dispatch(refetchTokenStore(dataTemplate));
              config.headers.Authorization = "Bearer " + data;
            }
          } catch (error) {
            Promise.reject(error);
          }
          isRefreshing = false;
          refreshPromise = null;
        }
      }

      return config;
    },
    (error: AxiosError): Promise<AxiosError> => {
      return Promise.reject(error);
    }
  );
  httpRequest.default.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const { config, status } = error;
      const originalRequest = config;
      // logout system
      if (
        status === 401 &&
        originalRequest?.url?.includes("user/refreshToken")
      ) {
        if (!isRefreshing) {
          isRefreshing = true;
          dispatch(logoutThunk());
        }
        isRefreshing = false;
      }
      return Promise.reject(error);
    }
  );
};
