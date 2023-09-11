import { Auth } from "../../type";
import * as httpRequest from "../../utils/httpRequest";

export const loginPass = async (params: Auth) => {
  try {
    console.log(params);
    const res = await httpRequest.post("/user/login", {
      username: params.username,
      password: params.password,
    });
    return res?.data;
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};
export const test = async () => {
  try {
    const res = await httpRequest.get("/user/listServerOfUser");
    console.log(res);
    return res?.result;
  } catch (error) {
    return Promise.reject(error);
  }
};
