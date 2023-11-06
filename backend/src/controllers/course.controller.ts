import { Request, Response } from "express";
import CourseService from "../services/course.service";

const create = async (req: Request, res: Response) => {
  const { body } = req;
  try {
    const data = await CourseService.create(body);
    res.status(data.status).json({ data });
  } catch (error) {
    if (error) {
      res.status(400).json({ error: error });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

const getAll = async (req: Request, res: Response) => {
  try {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const courses = await CourseService.getAll(page, 5);
    res.status(courses.status).json({ courses });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const course = await CourseService.getById(id);
    res.status(course.status).json(course);
  } catch (error) {
    if (error) {
      res.status(400).json({ error: error });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const data = await CourseService.updateById(id, body);
    res.status(data.status).json({ data });
  } catch (error) {
    if (error) {
      res.status(400).json({ error: error });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

const deleteById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const data = await CourseService.deleteById(id);
    res.status(data.status).json({ data });
  } catch (error) {
    if (error) {
      res.status(400).json({ error: error });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

const getCourseByTeacherId = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const courses = await CourseService.getCourseByTeacherId(id);
    res.status(courses.status).json({ data: courses });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getCourseByStudentId = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const courses = await CourseService.getCourseByStudentId(id);
    res.status(courses.status).json({ data: courses });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getCourseDetails = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const courses = await CourseService.getCourseDetails(id);
    res.status(courses.status).json({ data: courses });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getOverviewCourse = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const courses = await CourseService.getOverviewCourse(id);
    res.status(courses.status).json({ courses });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export default {
  create,
  getAll,
  getById,
  update,
  deleteById,
  getCourseByTeacherId,
  getCourseByStudentId,
  getCourseDetails,
  getOverviewCourse
};
