import { Request, Response } from "express";
import reviewService from "../services/review.service";

const getReviews = async (req: Request, res: Response) => {
  try {
    const { course_id } = req.body;
    let result: any;
    result = await reviewService.getReviews(course_id);
    if (result?.status) {
      res.status(200).json({
        status: 200,
        data: result?.data,
        message: result?.message,
      });
    } else {
      res.status(400).json({
        status: 400,
        data: {},
        message: result?.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      data: {},
      message: error,
    });
  }
};

const addNewReview = async (req: Request, res: Response) => {
  try {
    const { content, author_id, course_id, rating, title } = req.body;
    let result: any;
    result = await reviewService.addNewReview(
      content,
      author_id,
      course_id,
      rating,
      title
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
        data: {},
        message: result?.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      data: {},
      message: error,
    });
  }
};

const getAllReviews = async (req: Request, res: Response) => {
  try {
    const { course_id } = req.body;
    let result: any;
    result = await reviewService.getAllReviews(course_id);
    if (result?.status) {
      res.status(200).json({
        status: 200,
        data: result?.data,
        message: result?.message,
      });
    } else {
      res.status(400).json({
        status: 400,
        data: {},
        message: result?.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      data: {},
      message: error,
    });
  }
};

const getstatisticStar = async (req: Request, res: Response) => {
  try {
    const { course_id } = req.body;
    let result: any;
    result = await reviewService.getstatisticStar(course_id);
    if (result?.status) {
      res.status(200).json({
        status: 200,
        data: result?.data,
        message: result?.message,
      });
    } else {
      res.status(400).json({
        status: 400,
        data: {},
        message: result?.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      data: {},
      message: error,
    });
  }
};

export default {
  getReviews,
  addNewReview,
  getAllReviews,
  getstatisticStar,
};
