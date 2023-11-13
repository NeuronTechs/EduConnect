import { Request, Response } from "express";
import topicService from "../services/topic.service";

const getRecommendCourse = async (req: Request, res: Response) => {
  console.log("call");
  try {
    const result = await topicService.getCoursesRecommend();
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
  const { limit } = req.query;
  const { topicId } = req.params;
  try {
    const result = await topicService.getTopicCourses(
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
    const result = await topicService.getTopicCategory(
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
