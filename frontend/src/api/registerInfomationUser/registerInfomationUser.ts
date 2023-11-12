import * as httpRequest from "../../utils/httpRequest";
interface dataInformationUser {}
export const addInformationUser = async (data: dataInformationUser) => {
  try {
    const result = await httpRequest.post("/user/updateinformation", data);
    return result;
  } catch (error) {
    return Promise.reject(error);
  }
};
