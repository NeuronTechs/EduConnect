import { Request, Response } from "express";
import searchService from "../services/search.service";

const search = async (req: Request, res: Response) => {
  const { keyword, limit } = req.query;
  try {
    const result = await searchService.search(
      keyword as string,
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

export default { search };
