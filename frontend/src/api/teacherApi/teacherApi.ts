import { ICourseDetail } from "@/types/type";
import * as httpRequest from "@/utils/httpRequest";
import { AxiosRequestHeaders } from "axios";

export const getTeacherDetail = async (params: { id: string }) => {
  try {
    const res = await httpRequest.get("/teachers/" + params.id);
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const teacherRecommendationsApi = async (params: { limit: string }) => {
  try {
    const res = await httpRequest.get("/teachers/recommendations", {
      params: { limit: params.limit },
    });
    return res.data;
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
      params: params.limit,
    });
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getCourseByTeacher = async (params: {
  teacherId: string;
  limit: number;
}) => {
  try {
    const res = await httpRequest.get(
      `/teachers/${params.teacherId}/courses/all`,
      {
        params: { limit: params.limit },
      }
    );
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateCourseTeacher = async (data: ICourseDetail) => {
  const formData = new FormData();
  formData.append("title", data.title ? data.title : "");
  formData.append("description", data.description ? data.description : "");
  if (typeof data.image === "string") {
    formData.append("image", data.image);
  } else {
    if (data.image.length > 0) {
      formData.append("image", data.image[0]);
    }
  }
  formData.append(
    "teacher_id",
    data.teacher_id ? data.teacher_id.toString() : ""
  );

  if (data.discount) {
    formData.append("discount", data.discount ? data.discount.toString() : "0");
  }

  if (data.price) {
    formData.append("price", data.price ? data.price.toString() : "0");
  }

  formData.append("topic_id", data.topic_id ? data.topic_id.toString() : "");
  formData.append("level", data.level ? data.level.toString() : "");
  formData.append("study", JSON.stringify(data.study));
  formData.append("requirement", JSON.stringify(data.requirement));
  formData.append(
    "language",
    data.language ? data.language.toString() : "Tiêng việt"
  );
  formData.append("status", data.status ? data.status.toString() : "0");
  formData.append(
    "create_at",
    data.created_at ? data.created_at : Date.now().toString()
  );
  formData.append("update_at", Date.now().toString());
  // add form data
  const headers = {
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
  };
  // set header for axios
  try {
    const res = await httpRequest.put(
      `/teachers/${data.teacher_id}/courses/${data.course_id}`,

      formData,
      headers as AxiosRequestHeaders
    );

    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getCourseTeacherById = async (params: {
  teacherId: string;
  courseId: string;
}) => {
  try {
    const res = await httpRequest.get(
      `/teachers/${params.teacherId}/courses/${params.courseId}`
    );
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getStudentByTeacher = async (teacher_id: string) => {
  try {
    const res = await httpRequest.get(`teachers/list-student/${teacher_id}`);
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getPaymentByPaymentTeacherId = async (teacher_id: string) => {
  try {
    const res = await httpRequest.get(`payment/teacher-payment/${teacher_id}`);
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getTeacherReport = async (teacher_id: string) => {
  try {
    const res = await httpRequest.get(
      `transaction/teacher-report/${teacher_id}`
    );
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getTransactionEachCourseByTeacher = async (teacher_id: string) => {
  try {
    const res = await httpRequest.get(
      `transaction/transaction-course-teacher/${teacher_id}`
    );
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};
