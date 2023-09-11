import * as httpRequest from "../../utils/httpRequest";
interface dataInformationUser {}
export const addInformationUser = async (data: dataInformationUser) => {
  try {
    const result = await httpRequest.post(
      "http://localhost:3000/v1/user/updateinformation",
      data
    );
    return result;
  } catch (error) {
    return Promise.reject(error);
  }
};
