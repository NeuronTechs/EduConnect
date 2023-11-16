import * as httpRequest from "@/utils/httpRequest";

export const teacherRecommendationsApi = async (params: { limit: string }) => {
  try {
    const res = await httpRequest.get("/teachers/recommendations", params);
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getCourseTeacherApi = async (params: {
  teacherId: string;
  limit: number;
}) => {
  try {
    const res = await httpRequest.get(`/teachers/${params.teacherId}/courses`, {
      query: params.limit,
    });
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};
