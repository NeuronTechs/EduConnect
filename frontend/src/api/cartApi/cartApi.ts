import * as httpRequest from "../../utils/httpRequest";

export const getCarts = async (student_id: String) => {
  try {
    const res = await httpRequest.get(`/cart/getcart/${student_id}`);
    // console.log(res);
    return res?.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const addToCart = async (student_id: string, course_id: string) => {
  try {
    const res = await httpRequest.post("/cart/addtocart", {
      student_id,
      course_id,
    });
    // console.log(res);
    return res?.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const removeToCart = async (cart_id: string) => {
  try {
    const res = await httpRequest.post("/cart/removetocart", {
      cart_id,
    });
    // console.log(res);
    return res?.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
