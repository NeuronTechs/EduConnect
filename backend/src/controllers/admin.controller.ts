import { Request, Response } from "express";
import adminService from "../services/admin.service";

const getAllUser = async (req: Request, res: Response) => {
  const { page, txtSearch } = req.query;
  const pageSize = 3;
  try {
    const result = await adminService.getAllUser(
      Number(page),
      pageSize,
      txtSearch as string
    );
    if (result?.status) {
      res.status(200).json({
        status: 200,
        data: result?.data,
        totalPage: result?.totalPage,
        total: result?.total,
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
    res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  }
};

const setStatusUser = async (req: Request, res: Response) => {
  try {
    const { status, username } = req.body;
    const result = await adminService.setStatusUser(status, username);
    if (result.status)
      res.status(200).json({
        status: 200,
        message: result?.message,
      });
    else
      res.status(400).json({
        status: 400,
        message: result?.message,
      });
  } catch (error) {
    if (error) {
      res.status(400).json({ error: error });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

const getAllCourseWithTeacherData = async (req: Request, res: Response) => {
  const { page, txtSearch, status } = req.query;
  console.log(page, txtSearch);

  const pageSize = 3;
  try {
    const result = await adminService.getAllCourseWithTeacherData(
      Number(page),
      pageSize,
      txtSearch as string,
      status as string
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
    res.status(500).json({
      status: 500,
      message: error,
    });
  }
};

const setStatusCourse = async (req: Request, res: Response) => {
  try {
    const { status, course_id } = req.body;
    console.log(req.body);

    const result = await adminService.setStatusCourse(status, course_id);
    if (result.status)
      res.status(200).json({
        status: 200,
        message: result?.message,
      });
    else
      res.status(400).json({
        status: 400,
        message: result?.message,
      });
  } catch (error) {
    if (error) {
      res.status(400).json({ error: error });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

const teacherSellReport = async (req: Request, res: Response) => {
  const { page } = req.query;
  const pageSize = 5;
  try {
    const result = await adminService.teacherSellReport(Number(page), pageSize);
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
    res.status(500).json({
      status: 500,
      message: error,
    });
  }
};

const getTeachersSellDetail = async (req: Request, res: Response) => {
  try {
    const result = await adminService.getTeachersSellDetail();
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
    res.status(500).json({
      status: 500,
      message: error,
    });
  }
};

export default {
  getAllUser,
  setStatusUser,
  getAllCourseWithTeacherData,
  setStatusCourse,
  teacherSellReport,
  getTeachersSellDetail,
};
