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
export default {
  getTeacherRecommendations,
  getTeacherDetail,
};
