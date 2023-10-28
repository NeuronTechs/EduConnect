import * as httpRequest from "../../utils/httpRequest";

export const getCourseByStudentId = async (params: string) => {
  try {
    const res = await httpRequest.get(`/course/courses-by-student/${params}`);
    return res?.result;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getCourseDetails = async (params: string) => {
  try {
    const res = await httpRequest.get(`/course/course-details/${params}`);

    return res?.data?.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
