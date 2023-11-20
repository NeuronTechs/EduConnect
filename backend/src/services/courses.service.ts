import connectDB from "../config/connectDB";
import { v4 as uuidv4 } from "uuid";
import { dataListResponse, dataResponse } from "../constant/type";
import { QueryError } from "mysql2";

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
  status_show?: string;
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
  title: string;
  description: string;
  course_id: string;
  lecture: ILecture[];
  created_at?: string;
  updated_at?: string;
}

interface ILecture {
  lecture_id: string;
  title: string;
  description: string;
  content: string;
  section_id: string;
  created_at?: string;
  updated_at?: string;
}
const getSectionOfCourse = async (course_id: string) => {
  const query = `SELECT * FROM session WHERE course_id = ?`;
  return new Promise<dataListResponse<ISection>>((resolve, rejects) => {
    try {
      connectDB.connectionDB.query(
        { sql: query, values: [`${course_id}`] },
        (err: QueryError, result: ISection[]) => {
          if (err) {
            rejects(err);
            return;
          }
          resolve({
            status: 200,
            data: result as ISection[],
            message: "Get section successfully",
          });
        }
      );
    } catch (err) {
      rejects(err);
    }
  });
};

const createCourseSection = async (section: ISection) => {
  section.section_id = uuidv4();
  const query = `INSERT INTO session SET ?`;
  return new Promise<dataResponse<ISection>>((resolve, rejects) => {
    try {
      connectDB.connectionDB.query(
        { sql: query, values: [section] },
        (err: QueryError, result: ISection) => {
          if (err) {
            rejects(err);
            return;
          }
          resolve({
            status: 200,
            data: result as ISection,
            message: "Created successfully",
          });
        }
      );
    } catch (err) {
      rejects(err);
    }
  });
};
const updateSectionOfCourse = async (section: ISection) => {
  const query = `UPDATE session SET ? WHERE section_id = ?`;
  return new Promise<dataResponse<ISection>>((resolve, rejects) => {
    try {
      connectDB.connectionDB.query(
        { sql: query, values: [section, section.section_id] },
        (err: QueryError, result: ISection) => {
          if (err) {
            rejects(err);
            return;
          }
          resolve({
            status: 200,
            data: result as ISection,
            message: "Updated successfully",
          });
        }
      );
    } catch (err) {
      rejects(err);
    }
  });
};
const deleteSectionOfCourse = async (section_id: string) => {
  const query = `DELETE FROM session WHERE section_id = ?`;
  return new Promise<dataResponse<ISection>>((resolve, rejects) => {
    try {
      connectDB.connectionDB.query(
        { sql: query, values: [section_id] },
        (err: QueryError, result: ISection) => {
          if (err) {
            rejects(err);
            return;
          }
          resolve({
            status: 200,
            data: result as ISection,
            message: "Deleted successfully",
          });
        }
      );
    } catch (err) {
      rejects(err);
    }
  });
};
export default {
  createCourseSection,
  getSectionOfCourse,
  updateSectionOfCourse,
  deleteSectionOfCourse,
};
