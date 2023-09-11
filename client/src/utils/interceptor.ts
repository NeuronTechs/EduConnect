import { AxiosError } from "axios";
import { useSelector } from "react-redux";
import { User } from "../type";
import instance from "./httpRequest";
interface State {
  auth: {
    currentUser: User | null;
  };
}
interface RequestPromise {
  resolve: (token: string) => void;
  reject: (error: AxiosError) => void;
}
export const setupInterceptor = (): void => {
  let isRefreshing = false;
  let failedQueue: RequestPromise[] = [];

  const processQueue = (error?: AxiosError | null, token?: string | null) => {
    failedQueue.forEach((prom) => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token!);
      }
    });

    failedQueue = [];
  };
  instance.interceptors.request.use(
    (config) => {
      if (
        config.url?.includes("user/login") ||
        config.url?.includes("user/refresh")
      ) {
        return config;
      }
      const currentUser: User | null = useSelector(
        (state: State) => state.auth.currentUser
      );
      const token = currentUser?.accessToken;
      console.log(token);

      if (token) {
        config.headers.token = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      const {
        config,
        response: { status },
      } = error;
      const originalRequest = config;

      if (status === 401) {
        if (!isRefreshing) {
          isRefreshing = true;

          return instance
            .post("/user/refresh")
            .then((response) => {
              localStorage.setItem("accessToken", response.data.accessToken);
              localStorage.setItem("refreshToken", response.data.refreshToken);

              instance.defaults.headers.common[
                "Authorization"
              ] = `Bearer ${response.data.accessToken}`;
              originalRequest.headers[
                "Authorization"
              ] = `Bearer ${response.data.accessToken}`;

              processQueue(null, response.data.accessToken);
              return instance(originalRequest);
            })
            .catch((err) => {
              processQueue(err, null);
              return Promise.reject(err);
            })
            .finally(() => {
              isRefreshing = false;
            });
        }

        const retryOriginalRequest = new Promise<string>((resolve) => {
          failedQueue.push({
            resolve: (token: string) => {
              resolve(token);
            },
            reject: (error: AxiosError) => {
              console.log(error);
            },
          });
        });
        return retryOriginalRequest;
      }
      return Promise.reject(error);
    }
  );
};
