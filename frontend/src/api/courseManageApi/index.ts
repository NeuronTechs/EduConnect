/* eslint-disable @typescript-eslint/no-explicit-any */
import { ILessonInfo } from "@/types/type";
import * as httpRequest from "@/utils/httpRequest";

const getSectionCourse = async (idCourse: string) => {
  try {
    const res = await httpRequest.get(`/courses/${idCourse}/sections`);
    return res?.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
const createSectionCourse = async (idCourse: string, data: any) => {
  try {
    const res = await httpRequest.post(`/courses/${idCourse}/sections`, data);
    return res?.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
const updateSectionCourse = async (idCourse: string, data: any) => {
  try {
    const res = await httpRequest.put(`/courses/sections`, {
      session_id: idCourse,
      ...data,
    });
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
const deleteSectionCourse = async (idSection: string) => {
  try {
    const res = await httpRequest.deleted(`/courses/sections/${idSection}`);
    return res?.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

const createLessonSectionCourse = async (data: ILessonInfo) => {
  console.log(data);
  try {
    const res = await httpRequest.post(
      `/courses/sections/${data.session_id}/lessons`,
      data
    );
    return res?.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

const updateLessonSectionCourse = async (data: ILessonInfo) => {
  try {
    const res = await httpRequest.put(
      `/courses/lessons/${data.lecture_id}`,
      data
    );
    return res?.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
const deleteLessonSectionCourse = async (idLesson: string) => {
  try {
    const res = await httpRequest.deleted(`/courses/lessons/${idLesson}`);
    return res?.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
export default {
  getSectionCourse,
  createSectionCourse,
  updateSectionCourse,
  deleteSectionCourse,
  createLessonSectionCourse,
  updateLessonSectionCourse,
  deleteLessonSectionCourse,
};
