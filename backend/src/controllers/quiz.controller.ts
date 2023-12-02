import { Request, Response } from "express";
import quizService from "../services/quiz.service";
// quiz
const createQuiz = async (req: Request, res: Response) => {
  const { body } = req;
  try {
    const result = await quizService.createQuiz({ ...body });
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
const updateQuiz = async (req: Request, res: Response) => {
  const { body } = req;
  const { idLectures } = req.params;
  try {
    const result = await quizService.updateQuiz(idLectures, { ...body });
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
const getQuiz = async (req: Request, res: Response) => {
  const { idLectures } = req.params;
  try {
    const result = await quizService.getQuiz(idLectures);
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
// question quiz
const createQuestionQuiz = async (req: Request, res: Response) => {
  const { body } = req;
  try {
    const result = await quizService.createQuestionQuiz({ ...body });
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
const updateQuestionQuiz = async (req: Request, res: Response) => {
  const { body } = req;
  try {
    const result = await quizService.updateQuestionQuiz({
      ...body,
    });
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
const deleteQuestionQuiz = async (req: Request, res: Response) => {
  const { idQuestion } = req.params;
  try {
    const result = await quizService.deleteQuestionQuiz(idQuestion);
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
// answer
const createAnswerQuestionQuiz = async (req: Request, res: Response) => {
  const { body } = req;
  try {
    const result = await quizService.createAnswerQuestion({
      ...body,
    });
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
const updateAnswerQuestionQuiz = async (req: Request, res: Response) => {
  const { body } = req;
  try {
    const result = await quizService.updateAnswerQuestion({
      ...body,
    });
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
    console.log(error);
    res.status(500).json({ error: "Internal server error", message: error });
  }
};
const deleteAnswerQuestionQuiz = async (req: Request, res: Response) => {
  const { idAnswer } = req.params;
  try {
    const result = await quizService.deleteAnswerQuestion(idAnswer);
    if (result.status) {
      res.status(200).json({
        status: 200,
        data: result?.data,
        message: result?.message,
      });
    } else {
      console.log(result);
      res.status(400).json({
        status: 400,
        data: result?.data,
        message: result?.message,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error", message: error });
  }
};

const getQuizNotExpired = async (req: Request, res: Response) => {
  const { student_id } = req.params;
  try {
    const result = await quizService.getQuizNotExpired(student_id);
    if (result.status) {
      res.status(200).json({
        status: 200,
        data: result?.data,
        message: result?.message,
      });
    } else {
      console.log(result);
      res.status(400).json({
        status: 400,
        data: result?.data,
        message: result?.message,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error", message: error });
  }
};

export default {
  createQuiz,
  updateQuiz,
  getQuiz,

  createQuestionQuiz,
  updateQuestionQuiz,
  deleteQuestionQuiz,

  createAnswerQuestionQuiz,
  updateAnswerQuestionQuiz,
  deleteAnswerQuestionQuiz,

  getQuizNotExpired,
};
