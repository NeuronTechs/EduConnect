import { dataListResponse, dataResponse } from "../constant/type";
import db from "../config/connectDB";
import { v4 as uuidv4 } from "uuid";
import { title } from "process";

// topic
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
  image: string;
  price: number;
  study: string;
  requirement: string;
  level: string;
  language: string;
  discount: number;
  ranking?: number;
  status?: string;
  show?: string;
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
  description?: string;
  title: string;
  topic_id: string;
  level: string;
}
const createCourseTeacher = async (data: ICourseTeacher) => {
  try {
    const course_id = uuidv4();

    const query = `INSERT INTO course (teacher_id, course_id, title, topic_id, level, description) VALUES ('${data.teacher_id}', '${course_id}', '${data.title}', '${data.topic_id}', '${data.level}', '${data.description}');`;
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

const getCourseTeacher = async (id: string, limit: number) => {
  try {
    const query = `SELECT course.*, teacher.*, user.*, topic.* FROM course JOIN teacher ON course.teacher_id = teacher.teacher_id JOIN user ON teacher.username = user.username JOIN topic ON course.topic_id = topic.topic_id WHERE teacher.teacher_id = ? LIMIT ?`;
    return new Promise<dataListResponse<ICourse>>((resolve, reject) => {
      db.connectionDB.query(
        {
          sql: query,
          values: [`${id}`, limit ? limit : 10],
          nestTables: true,
        },
        (error, results: ICourseResult[]) => {
          if (error) {
            reject({
              status: 500,
              data: [],
              message: error,
            });
            return;
          }
          const dataResult = results.map((result) => {
            return {
              ...result?.course,
              teacher: result.teacher,
              user: result.user,
              topic: result.topic,
            };
          });
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
            data: dataResult as ICourse[],
            message: "Get courses successfully",
          });
        }
      );
    });
  } catch (error) {}
};
const updateCourseTeacher = async (id: string, data: ICourse) => {
  console.log(data);
  try {
    const query = `UPDATE course SET teacher_id='${data.teacher_id}', title = '${data.title}', description='${data.description}', image='${data.image}', price='${data.price}', topic_id = '${data.topic_id}', discount='${data.discount}', study='${data.study}',  level = '${data.level}', requirement='${data.requirement}', language='${data.language}', show='${data.show}', create_at='${data.created_at}', update_at='${data.updated_at}' WHERE course_id = '${id}';`;
    return new Promise<dataResponse<ICourse>>((resolve, reject) => {
      db.connectionDB.query(
        { sql: query },

        (error, course: ICourse, fields) => {
          const dataTmp = {
            ...data,
            course_id: id,
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
            data: dataTmp as ICourse,
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
  getCourseTeacher,
  updateCourseTeacher,
};
