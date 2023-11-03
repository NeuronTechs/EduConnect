import * as httpRequest from "../../utils/httpRequest";

export const getCarts = async (student_id: String) => {
  try {
    const res = await httpRequest.get("/cart/getcart", {
      student_id,
    });
    console.log(res);
    return res?.result;
  } catch (error) {
    return Promise.reject(error);
  }
};
