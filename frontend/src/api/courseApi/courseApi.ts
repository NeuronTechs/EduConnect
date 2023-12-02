import { addReview } from "@/types/type";
import * as httpRequest from "../../utils/httpRequest";
import { AxiosRequestHeaders } from "axios";

export const getCourseByStudentId = async (params: string) => {
  try {
    const res = await httpRequest.get(`/course/courses-by-student/${params}`);
    console.log(res);

    return res?.data.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getCourseDetails = async (params: {
  id: string;
  user_id: string;
  role: string;
}) => {
  try {
    const res = await httpRequest.get(
      `/course/course-details/${params.id}/users/${params.user_id}/role/${params.role}`
    );

    return res?.data?.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getCourseOverview = async (params: string) => {
  try {
    const res = await httpRequest.get(`/course/overview-course/${params}`);
    return res?.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const CommentLecture = async (params: FormData) => {
  try {
    const res = await httpRequest.post(`/comment/create`, params, {
      "Content-Type": "multipart/form-data",
    } as AxiosRequestHeaders);
    return res?.data?.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
export const CommentOfLecture = async (params: {
  id: string;
  paging: number;
}) => {
  try {
    const res = await httpRequest.get(
      `/comment/comments-by-lecture/${params.id}?page=${params.paging}`
    );
    return res?.data?.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getReplyByCommentId = async (params: {
  id: string;
  paging: number;
}) => {
  try {
    const res = await httpRequest.get(
      `/comment/reply-by-comment/${params.id}?page=${params.paging}`
    );
    return res?.data?.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getReviewCourse = async (params: string) => {
  try {
    const res = await httpRequest.get(`/review/get-reviews/${params}`);
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getAllReviewCourse = async (params: string) => {
  try {
    const res = await httpRequest.get(`/review/get-all-reviews/${params}`);
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getStatisticStar = async (params: string) => {
  try {
    const res = await httpRequest.get(`/review/get-statistic-star/${params}`);
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getTeacherInOverviewCourse = async (params: string) => {
  try {
    const res = await httpRequest.get(`/user/information-teacher/${params}`);
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const addToReview = async (params: addReview) => {
  try {
    const res = await httpRequest.post(`/review/add-review`, params);
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const addTransactionInCourse = async (params: any) => {
  try {
    const res = await httpRequest.post(
      `/course/add-transaction-course`,
      params
    );
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const addComplaint = async (params: FormData) => {
  try {
    const res = await httpRequest.post(`/course/complaint-course`, params, {
      "Content-Type": "multipart/form-data",
    } as AxiosRequestHeaders);
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};
