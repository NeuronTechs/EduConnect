import { ICourseDetail } from "@/types/type";
import * as httpRequest from "@/utils/httpRequest";
import { AxiosRequestHeaders } from "axios";

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
  formData.append("price", data.price ? data.price.toString() : "");
  formData.append("discount", data.discount ? data.discount.toString() : "");
  formData.append("topic_id", data.topic_id ? data.topic_id.toString() : "");
  formData.append("study", data.study ? JSON.stringify(data.study) : "");
  formData.append("level", data.level ? data.level.toString() : "");
  formData.append(
    "requirement",
    data.requirement ? JSON.stringify(data.requirement) : ""
  );
  formData.append("language", data.language ? data.language.toString() : "");

  formData.append(
    "status_show",
    data.status_show ? data.status_show.toString() : ""
  );

  formData.append(
    "created_at",
    data.created_at ? data.created_at : Date.now().toString()
  );
  formData.append("updated_at", Date.now().toString());
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

    return res;
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
