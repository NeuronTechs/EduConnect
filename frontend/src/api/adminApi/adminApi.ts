import * as httpRequest from "../../utils/httpRequest";

export const getComplaintCourse = async (page: number) => {
  try {
    const res = await httpRequest.get(
      `/course/get-complaint-course?page=${page}`
    );
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getComplaintDetail = async (complaint_id: string) => {
  try {
    const res = await httpRequest.get(
      `/course/get-complaint-detail/${complaint_id}`
    );
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const resolveComplaintCourse = async (
  complaint_id: string,
  course_id: string
) => {
  try {
    const res = await httpRequest.post(`/course/resolve-complaint-course`, {
      complaint_id: complaint_id,
      course_id: course_id,
    });
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getAllUser = async (page: number, txtSearch: string) => {
  try {
    const res = await httpRequest.get(
      `/admin/list-user?page=${page}&txtSearch=${txtSearch}`
    );
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const setStatusUser = async (status: string, username: string) => {
  try {
    const res = await httpRequest.post(`/admin/set-status-user`, {
      status,
      username,
    });
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getTransactionReport = async () => {
  try {
    const res = await httpRequest.get(`/transaction/report`);
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};
