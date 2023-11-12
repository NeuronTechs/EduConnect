import * as httpRequest from "@/utils/httpRequest";

export const teacherRecommendationsApi = async (params: { limit: string }) => {
  try {
    const res = await httpRequest.get("/topics/recommendations", params);
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};
