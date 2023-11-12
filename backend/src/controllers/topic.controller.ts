import { Request, Response } from "express";
import categoryService from "../services/category.service";

const getRecommendCourse = async (req: Request, res: Response) => {
  console.log("call");
  try {
    const result = await categoryService.getCoursesRecommend();
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
const getTopicCourse = async (req: Request, res: Response) => {
  const { topicId, limit } = req.query;
  try {
    const result = await categoryService.getTopicCourses(
      topicId as string,
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
const getTopicCategory = async (req: Request, res: Response) => {
  const { limit } = req.query;

  try {
    const result = await categoryService.getTopicCategory(
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
export default {
  getRecommendCourse,
  getTopicCourse,
  getTopicCategory,
};
