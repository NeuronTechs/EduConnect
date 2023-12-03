import { dataListResponse, dataResponse } from "../constant/type";
import db from "../config/connectDB";
import { v4 as uuidv4 } from "uuid";
import { title } from "process";
import { QueryError } from "mysql2";
import { RowDataPacket } from "mysql2";
import teacherController from "../controllers/teacher.controller";

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
  create_at?: string;
  update_at?: string;
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
  transactions?: {
    total_student: number;
  };
  review?: {
    total_review: number;
    score_review: number;
  };
}
interface ITeacherResult {
  teacher: ITeacher;
  user: IUser;
  "": { totalCourse: number; totalStudent: number };
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

// recommend teacher for user
const getTeacherRecommendations = async (limit: string) => {
  try {
    const query = `SELECT teacher.*, user.*, COUNT(DISTINCT course.course_id) as totalCourse  , count(DISTINCT transactions.student_id) as totalStudent
    FROM teacher 
    LEFT JOIN user ON teacher.username = user.username 
    LEFT JOIN course ON teacher.teacher_id = course.teacher_id  
    LEFT JOIN transactions ON transactions.course_id = course.course_id   
    GROUP BY teacher.teacher_id 
    limit ${limit ? limit : 10};`;
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
              totalCourse: result[""].totalCourse
                ? result?.[""].totalCourse
                : 0,
              totalStudent: result[""].totalStudent
                ? result?.[""].totalStudent
                : 0,
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
    const query = `SELECT teacher.*, user.*, COUNT(DISTINCT course.course_id) as totalCourse  , count(DISTINCT transactions.student_id) as totalStudent
    FROM teacher 
    LEFT JOIN course ON teacher.teacher_id = course.teacher_id  
    LEFT JOIN transactions ON transactions.course_id = course.course_id  
    LEFT JOIN user ON teacher.username = user.username  
    WHERE teacher.teacher_id ='${id}' 
    GROUP BY teacher.teacher_id;
    
    `;
    return new Promise<dataResponse<ITeacher>>((resolve, reject) => {
      db.connectionDB.query(
        { sql: query, nestTables: true },
        (
          error: QueryError,
          course: {
            teacher: ITeacher;
            user: IUser;
            "": { totalCourse: number; totalStudent: number };
          }[],
          fields
        ) => {
          if (error) {
            reject({
              status: 500,
              data: [],
              message: error,
            });
            return;
          }
          const data = {
            ...course[0]?.teacher,
            user: course[0]?.user,
            totalCourse: course[0]?.[""].totalCourse,
            totalStudent: course[0]?.[""].totalStudent,
          };
          resolve({
            status: 200,
            data: data as ITeacher,
            message: "Get teacher successfully",
          });
        }
      );
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
  status?: number;
}
const createCourseTeacher = async (data: ICourseTeacher) => {
  try {
    const course_id = uuidv4();
    const query = `INSERT INTO course (teacher_id, course_id, title, topic_id, level, description, status) VALUES ('${data.teacher_id}', '${course_id}', '${data.title}', '${data.topic_id}', '${data.level}', '${data.description}', '${data.status}');`;
    return new Promise<dataResponse<ICourseTeacher>>((resolve, reject) => {
      db.connectionDB.query(
        { sql: query },
        (error: QueryError, course: ICourseTeacher, fields) => {
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
    const query = `SELECT course.*, teacher.*, user.*, topic.* FROM course JOIN teacher ON course.teacher_id = teacher.teacher_id JOIN user ON teacher.username = user.username JOIN topic ON course.topic_id = topic.topic_id WHERE teacher.teacher_id = ?  AND course.status =  2 LIMIT ?`;
    return new Promise<dataListResponse<ICourse>>((resolve, reject) => {
      db.connectionDB.query(
        {
          sql: query,
          values: [`${id}`, limit ? limit : 10],
          nestTables: true,
        },
        (error: QueryError, results: ICourseResult[]) => {
          if (error) {
            reject({
              status: 500,
              data: [],
              message: error,
            });
            return;
          } else {
            const dataResult = results.map((result) => {
              return {
                ...result.course,
                // study: JSON.parse(result?.course?.study),
                // requirement: JSON.parse(result?.course?.requirement),
                teacher: result.teacher,
                user: result.user,
                topic: result.topic,
              };
            });
            resolve({
              status: 200,
              data: dataResult as ICourse[],
              message: "Get courses successfully",
            });
          }
        }
      );
    });
  } catch (error) {
    throw error;
  }
};
const updateCourseTeacher = async (id: string, data: ICourse) => {
  data.update_at = new Date().toISOString().slice(0, 19).replace("T", " ");
  data.create_at = new Date().toISOString().slice(0, 19).replace("T", " ");

  try {
    const query = `UPDATE course SET ? WHERE course_id = ?;`;
    return new Promise<dataResponse<ICourse>>((resolve, reject) => {
      db.connectionDB.query(
        { sql: query, values: [{ ...data, image: data.image.path }, id] },

        (error: QueryError, course: ICourse) => {
          const dataTmp = {
            ...data,
            image: data.image.path,
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
            data: dataTmp as unknown as ICourse,
            message: "update course successfully",
          });
        }
      );
    });
  } catch (error) {
    throw error;
  }
};
const getCourseTeacherById = async (id: string) => {
  try {
    const query = `SELECT course.*, teacher.*, user.*, topic.* 
    FROM course JOIN teacher ON course.teacher_id = teacher.teacher_id 
    JOIN user ON teacher.username = user.username 
    JOIN topic ON course.topic_id = topic.topic_id 
    WHERE course.course_id = ? ;`;
    return new Promise<dataResponse<ICourse>>((resolve, reject) => {
      db.connectionDB.query(
        {
          sql: query,
          values: [`${id}`],
          nestTables: true,
        },
        (error: QueryError, results: ICourseResult[]) => {
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
          resolve({
            status: 200,
            data: dataResult[0] ? dataResult[0] : ({} as ICourse),
            message: "Get courses successfully",
          });
        }
      );
    });
  } catch (error) {
    throw error;
  }
};
const getStudentByTeacher = (teacher_id: string): Promise<any> => {
  try {
    const query = `SELECT 
    c.course_id, c.title as course_name, t.teacher_id, s.student_id, s.username, 
    u.full_name, u.avatar, u.address, o.createdAt
    FROM 
        course c
    left JOIN 
        teacher t ON c.teacher_id = t.teacher_id
    left JOIN 
        order_items o ON c.course_id = o.course_id
    left JOIN 
        student s ON o.student_id = s.student_id
    left JOIN 
        user u ON s.username = u.username
    where t.teacher_id = ?`;
    return new Promise((resolve, reject) => {
      db.connectionDB.query(
        query,
        [teacher_id],
        (error, result: RowDataPacket[], fields) => {
          if (error) {
            reject({
              status: false,
              data: {},
              message: error,
            });
            return;
          } else {
            const transformedData: { [key: string]: TransformedData } = {};

            // Lặp qua từng mục trong dữ liệu từ API
            result.forEach((item) => {
              const {
                teacher_id,
                course_id,
                course_name,
                student_id,
                full_name,
                avatar,
                address,
                createdAt,
                username,
              } = item;

              // Nếu giáo viên chưa tồn tại trong đối tượng chuyển đổi, thêm vào
              if (!transformedData["teacher_id"]) {
                transformedData["teacher_id"] = { teacher_id, course: [] };
              }

              // Nếu khóa học chưa tồn tại trong mảng course, thêm vào
              const courseIndex = transformedData[
                "teacher_id"
              ].course.findIndex((c) => c.course_id === course_id);
              if (courseIndex === -1) {
                transformedData["teacher_id"].course.push({
                  course_id,
                  course_name,
                  student: [],
                });
              }

              // Nếu sinh viên tồn tại, thêm vào mảng student của khóa học
              if (student_id) {
                transformedData["teacher_id"].course
                  .find((c) => c.course_id === course_id)!
                  .student.push({
                    student_id,
                    student_name: full_name,
                    username,
                    avatar,
                    address,
                    timeStart: createdAt,
                  });
              }
            });

            resolve({
              status: true,
              data: transformedData,
              message: "Get student by teacher success",
            });
          }
        }
      );
    });
  } catch (error) {
    throw error;
  }
};
const getCourseByTeacher2 = (
  teacher_id: string,
  limit: number
): Promise<any> => {
  try {
    const query = `SELECT course.*, teacher.*, user.*, topic.* , total_student, total_review, score_review
    FROM course JOIN teacher ON course.teacher_id = teacher.teacher_id 
    JOIN user ON teacher.username = user.username 
    JOIN topic ON course.topic_id = topic.topic_id 
    LEFT JOIN (SELECT course_id, COUNT(student_id) as total_student 
    FROM transactions GROUP BY course_id) as transactions ON transactions.course_id = course.course_id
    LEFT JOIN (SELECT course_id, AVG(rating) as score_review, COUNT(review_id) as total_review 
    FROM review GROUP BY course_id) as review ON review.course_id = course.course_id
    WHERE teacher.teacher_id = ?  
    LIMIT ?`;
    return new Promise<dataListResponse<ICourse>>((resolve, reject) => {
      db.connectionDB.query(
        {
          sql: query,
          values: [`${teacher_id}`, limit ? limit : 10],
          nestTables: true,
        },
        (error: QueryError, results: ICourseResult[]) => {
          if (error) {
            reject({
              status: 500,
              data: [],
              message: error,
            });
            return;
          } else {
            const dataResult = results.map((result) => {
              return {
                ...result.course,
                teacher: result.teacher,
                user: result.user,
                topic: result.topic,
                total_student: result.transactions?.total_student,
                total_review: result.review?.total_review,
                ranking: result.review?.score_review,
              };
            });
            resolve({
              status: 200,
              data: dataResult as ICourse[],
              message: "Get courses successfully by teacher",
            });
          }
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
  getCourseTeacherById,
  getCourseTeacher,
  updateCourseTeacher,
  getStudentByTeacher,
  getCourseByTeacher2,
};
