import * as httpRequest from "@/utils/httpRequest";

export const getTopicByCourseId = async (params: string) => {
  try {
    const res = await httpRequest.get(`/topics/${params}/courses`);
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getTopicCategory = async (params: { limit: string }) => {
  const { limit } = params;
  try {
    const res = await httpRequest.get(`/topics?limit=${limit ? limit : 5}`);
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getRecommendCourse = async (params: { limit: string }) => {
  const { limit } = params;
  try {
    const res = await httpRequest.get(`/topics/recommendations`, {
      params: {
        limit: limit ? limit : 5,
      },
    });
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getAllTopic = async () => {
  try {
    const res = await httpRequest.get(`/topics/all`);
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
