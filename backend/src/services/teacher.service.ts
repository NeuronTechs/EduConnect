import { dataListResponse, dataResponse } from "../constant/type";
import db from "../config/connectDB";
import { v4 as uuidv4 } from "uuid";
import { title } from "process";

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
  user?: IUser;
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

interface ITeacherResult {
  teacher: ITeacher;
  user: IUser;
}
// recommend teacher for user
const getTeacherRecommendations = async (limit: string) => {
  try {
    const query = `SELECT * FROM teacher JOIN user ON teacher.username = user.username  limit ${
      limit ? limit : 10
    };`;
    return new Promise<dataListResponse<ITeacher>>((resolve, reject) => {
      db.connectionDB.query(
        { sql: query, nestTables: true },
        (error, course: ITeacherResult[], fields) => {
          if (error) {
            reject({
              status: 500,
              data: [],
              message: error,
            });
            return;
          }
          const data = course.map((result) => {
            return {
              ...result?.teacher,
              user: result?.user,
            };
          });
          resolve({
            status: 200,
            data: data as ITeacher[],
            message: "Get teacher successfully",
          });
        }
      );
    });
  } catch (error) {
    throw error;
  }
};
const getTeacherDetail = async (id: string) => {
  try {
    const query = `SELECT teacher.*, COUNT(DISTINCT course.course_id) as total_courses  
    FROM teacher LEFT JOIN course ON teacher.teacher_id = course.teacher_id  where id = ${id} GROUP BY teacher.teacher_id;`;
    return new Promise<dataListResponse<ITeacher>>((resolve, reject) => {
      db.connectionDB.query(query, (error, course, fields) => {
        if (error) {
          reject({
            status: 500,
            data: [],
            message: error,
          });
          return;
        }
        resolve({
          status: 200,
          data: course as ITeacher[],
          message: "Get teacher successfully",
        });
      });
    });
  } catch (error) {
    throw error;
  }
};

interface ICourseTeacher {
  teacher_id: string;
  course_id?: string;
  title: string;
  topic_id: string;
  level: string;
}
const createCourseTeacher = async (data: ICourseTeacher) => {
  try {
    const course_id = uuidv4();

    const query = `INSERT INTO course (teacher_id, course_id, title, topic_id, level) VALUES ('${data.teacher_id}', '${course_id}', '${data.title}', '${data.topic_id}', '${data.level}');`;
    return new Promise<dataResponse<ICourseTeacher>>((resolve, reject) => {
      db.connectionDB.query(
        { sql: query },
        (error, course: ICourseTeacher, fields) => {
          const dataTmp = {
            ...data,
            course_id: course_id,
          };
          if (error) {
            reject({
              status: 500,
              data: [],
              message: error,
            });
            return;
          }
          resolve({
            status: 201,
            data: dataTmp as ICourseTeacher,
            message: "Get teacher successfully",
          });
        }
      );
    });
  } catch (error) {
    throw error;
  }
};
export default {
  getTeacherRecommendations,
  getTeacherDetail,
  createCourseTeacher,
};
