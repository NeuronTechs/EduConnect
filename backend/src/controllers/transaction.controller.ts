import { Request, Response } from "express";
import TransactionService from "../services/Transaction.service";

const getTransactionReport = async (req: Request, res: Response) => {
  try {
    const result = await TransactionService.getTransactionReport();
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
      data: error,
      message: "Internal server error",
    });
  }
};

const getTeacherReport = async (req: Request, res: Response) => {
  try {
    const { teacher_id } = req.params;
    const result = await TransactionService.getTeacherReport(teacher_id);
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
      data: error,
      message: "Internal server error",
    });
  }
};
const getTransactionEachCourseByTeacher = async (
  req: Request,
  res: Response
) => {
  try {
    const { teacher_id } = req.params;
    const result = await TransactionService.getTransactionEachCourseByTeacher(
      teacher_id
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
      data: error,
      message: error,
    });
  }
};
export default {
  getTransactionReport,
  getTeacherReport,
  getTransactionEachCourseByTeacher,
};
