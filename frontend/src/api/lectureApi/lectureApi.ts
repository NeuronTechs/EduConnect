import { IStudentProgress } from "@/types/type";
import * as httpRequest from "../../utils/httpRequest";

export const createStudentProgress = async (params: IStudentProgress) => {
  try {
    const res = await httpRequest.post(
      `/lecture/student-progress/create`,
      params
    );
    return res?.data?.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateStudentProgress = async (params: IStudentProgress) => {
  try {
    const res = await httpRequest.put(
      `/lecture/student-progress/update`,
      params
    );
    return res?.data?.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
