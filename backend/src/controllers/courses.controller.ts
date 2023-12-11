import { Request, Response } from "express";
import coursesService from "../services/courses.service";

interface ITopic {
  topic_id: number;
  title: string;
  description: string;
  image?: string;
  course_count?: number;
}
interface ITeacher {
  teacher_id: string;
  username: string;
  introduce?: string;
  subject?: string;
  educational_level?: string;
  email: string;
  phone: string;
  avatar: string;
  course?: string;
  major: string;
  school: string;
  address_school?: string;
  amount?: number;
  totalStudent?: number;
  scoreReview?: number;
  totalReview?: number;
  totalCourse?: number;
  linkWeb?: string;
  linkFacebook?: string;
  linkYoutube?: string;
  linkLinkedin?: string;
}
// recommend course for user
interface ICourse {
  course_id: string;
  title: string;
  description: string;
  image: {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    filename: string;
    path: string;
  };
  price: number;
  study: string;
  requirement: string;
  level: string;
  language: string;
  discount: number;
  ranking?: number;
  status?: string;
  total_ranking?: number;
  total_enrollment?: number;
  total_lecture?: number;
  total_hour?: number;
  total_student?: number;
  teacher_id: string;
  topic_id: string;
  teacher?: ITeacher;
  user?: IUser;
  topic?: ITopic;
  created_at?: string;
  updated_at?: string;
}
interface IUser {
  username: string;
  full_name: string;
  email: string;
  avatar: string;
  phone: string;
  role: string;
  birthday: string;
  address: string;
  created_at?: string;
  updated_at?: string;
}
// course result call sql
interface ICourseResult {
  course: ICourse;
  teacher: ITeacher;
  user: IUser;
  topic: ITopic;
}
interface ITeacherResult {
  teacher: ITeacher;
  user: IUser;
}

interface TransformedData {
  teacher_id: string;
  course: CourseOfTeacher[];
}

interface CourseOfTeacher {
  course_id: string;
  course_name: string;
  student: StudentOfCourse[];
}

interface StudentOfCourse {
  student_id: string;
  username: string;
  avatar: string;
  address: string;
  timeStart: string;
  student_name: string;
}

interface ISection {
  section_id: string;
  name: string;
  description: string;
  course_id: string;
  lecture: ILecture[];
  created_at?: string;
  updated_at?: string;
}

interface ILecture {
  lecture_id: string;
  name: string;
  description: string;
  content: string;
  section_id: string;
  created_at?: string;
  updated_at?: string;
}
// section
const createSectionCourse = async (req: Request, res: Response) => {
  const { body } = req;
  try {
    const result = await coursesService.createCourseSection({ ...body });
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
const getSectionOfCourse = async (req: Request, res: Response) => {
  const { idCourse } = req.params;
  try {
    const result = await coursesService.getSectionOfCourse(idCourse);
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
const updateSectionOfCourse = async (req: Request, res: Response) => {
  const { body } = req;
  try {
    const result = await coursesService.updateSectionOfCourse({ ...body });
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
const deleteSectionOfCourse = async (req: Request, res: Response) => {
  const { idSection } = req.params;
  try {
    const result = await coursesService.deleteSectionOfCourse(idSection);
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
// lesson
const createCourseSectionLesson = async (req: Request, res: Response) => {
  const { body } = req;
  try {
    const result = await coursesService.createCourseSectionLesson({ ...body });
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
const updateCourseSectionLesson = async (req: Request, res: Response) => {
  const { body } = req;
  try {
    const result = await coursesService.updateCourseSectionLesson({ ...body });
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
const deleteCourseSectionLesson = async (req: Request, res: Response) => {
  const { idLecture } = req.params;
  try {
    const result = await coursesService.deleteCourseSectionLesson(idLecture);
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
  createSectionCourse,
  getSectionOfCourse,
  updateSectionOfCourse,
  deleteSectionOfCourse,
  createCourseSectionLesson,
  updateCourseSectionLesson,
  deleteCourseSectionLesson,
};
