import * as httpRequest from "@/utils/httpRequest";

export const getTopicByCourseId = async (params: string) => {
  try {
    const res = await httpRequest.get(`/topics/${params}/courses`);
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getTopicCategory = async (params: { limit: string }) => {
  const limit = params;
  try {
    const res = await httpRequest.get(`/topics?limit=${limit ? limit : 5}`);
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getRecommendCourse = async (params: { limit: string }) => {
  const limit = params;
  try {
    const res = await httpRequest.get(
      `/topics/recommendations?limit=${limit ? limit : 5}`
    );
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getAllTopic = async () => {
  try {
    const res = await httpRequest.get(`/topics/all`);
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};
