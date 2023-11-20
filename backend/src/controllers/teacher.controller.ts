import { Request, Response } from "express";
import teacherService from "../services/teacher.service";

const getTeacherRecommendations = async (req: Request, res: Response) => {
  const { limit } = req.query;
  try {
    const result = await teacherService.getTeacherRecommendations(
      limit as string
    );
    if (result?.status) {
      res.status(200).json({
        status: 200,
        data: result?.data,
        message: result?.message,
      });
    } else {
      res.status(400).json({
        status: 400,
        data: result?.data,
        message: result?.message,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      data: [],
      message: "Internal server error",
    });
  }
};
const getTeacherDetail = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await teacherService.getTeacherDetail(id as string);
    if (result?.status) {
      res.status(200).json({
        status: 200,
        data: result?.data,
        message: result?.message,
      });
    } else {
      res.status(400).json({
        status: 400,
        data: result?.data,
        message: result?.message,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      data: [],
      message: "Internal server error",
    });
  }
};
interface ICourseTeacher {
  teacher_id: string;
  course_id?: string;
  title: string;
  topic_id: string;
  level: string;
}
const createCourseTeacher = async (req: Request, res: Response) => {
  const { teacher_id, title, topic_id, level, description } = req.body;
  try {
    const result = await teacherService.createCourseTeacher({
      teacher_id: teacher_id,
      title: title,
      topic_id: topic_id,
      level: level,
      description: description,
    } as ICourseTeacher);
    if (result?.status) {
      res.status(201).json({
        status: 201,
        data: result?.data,
        message: result?.message,
      });
    } else {
      res.status(400).json({
        status: 400,
        data: result?.data,
        message: result?.message,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      data: [],
      message: "Internal server error",
    });
  }
};
const getCourseTeacher = async (req: Request, res: Response) => {
  const { teacherId } = req.params;
  const { limit } = req.query;
  try {
    const result = await teacherService.getCourseTeacher(
      teacherId as string,
      parseInt(limit as string)
    );
    if (result?.status) {
      res.status(200).json({
        status: 200,
        data: result?.data,
        message: result?.message,
      });
    } else {
      res.status(400).json({
        status: 400,
        data: result?.data,
        message: result?.message,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      data: [],
      message: "Internal server error",
    });
  }
};
const updateCourseTeacher = async (req: Request, res: Response) => {
  const { teacherId, courseId } = req.params;
  const { body, files } = req;
  console.log(files, body);
  try {
    const result = await teacherService.updateCourseTeacher(
      courseId as string,
      { ...req.body }
    );
    if (result?.status) {
      res.status(200).json({
        status: 200,
        data: result?.data,
        message: result?.message,
      });
    } else {
      res.status(400).json({
        status: 400,
        data: result?.data,
        message: result?.message,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      data: [],
      message: "Internal server error",
    });
  }
};
export default {
  getTeacherRecommendations,
  getTeacherDetail,
  createCourseTeacher,
  getCourseTeacher,
  updateCourseTeacher,
};
