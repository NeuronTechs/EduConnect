import { dataListResponse } from "../constant/type";
import db from "../config/connectDB";

interface ITeacher {
  id: number;
  name: string;
  description: string;
  image: string;
}
// recommend teacher for user
const getTeacherRecommendations = async () => {
  try {
    const query = `SELECT * FROM teacher limit 10;`;
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
export default {
  getTeacherRecommendations,
  getTeacherDetail,
};
