import * as httpRequest from "../../utils/httpRequest";

export const addInformationUser = async () => {
  try {
    const result = await httpRequest.post("/api/");
    return result;
  } catch (error) {
    return Promise.reject(error);
  }
};
