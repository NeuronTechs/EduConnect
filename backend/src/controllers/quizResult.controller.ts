import { Request, Response } from "express";
import quizResultService from "../services/quizResult.service";
// quizResult
const createQuizResult = async (req: Request, res: Response) => {
  const { body } = req;
  try {
    const result = await quizResultService.createQuiz({ ...body });
    if (result.status) {
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
    res.status(500).json({ error: "Internal server error", message: error });
  }
};
const getQuizResult = async (req: Request, res: Response) => {
  const { student_id, quiz_id } = req.params;
  try {
    const result = await quizResultService.getResult(student_id, quiz_id);
    if (result.status) {
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
    res.status(500).json({ error: "Internal server error", message: error });
  }
};

export default {
  createQuizResult,
  getQuizResult,
};
