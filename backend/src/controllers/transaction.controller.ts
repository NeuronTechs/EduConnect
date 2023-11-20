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

export default {
  getTransactionReport,
};
