import db from "../config/connectDB";
import { dataListResponse } from "../constant/type";
interface ICourse {
  course: {
    id: number;
    name: string;
    description: string;
    image: string;
    price: number;
    discount: number;
    rating: number;
    teacher_id: number;
    topic_id: number;
  };
  teacher: {
    id: number;
    name: string;
    description: string;
    image: string;
  };
  topic: {
    id: number;
    name: string;
    description: string;
    image: string;
  };
}
// recommend course for user
const getCoursesRecommend = async () => {
  try {
    const queryCheckExistCourse =
      "SELECT course.*, teacher.*, topic.* FROM course JOIN teacher ON course.teacher_id = teacher.teacher_id JOIN topic ON course.topic_id = topic.topic_id LIMIT 10";
    return new Promise<dataListResponse<object>>((resolve, reject) => {
      db.connectionDB.query(
        { sql: queryCheckExistCourse, nestTables: true },
        (error, results: ICourse[]) => {
          if (error) {
            reject({
              status: 500,
              data: [],
              message: error,
            });
            return;
          }
          // Transform the nested results into the desired format
          const courses = results.map((result) => {
            return {
              ...result.course,
              teacher: result.teacher,
              topic: result.topic,
            };
          });
          resolve({
            status: 200,
            data: courses,
            message: "Get courses successfully",
          });
        }
      );
    });
  } catch (error) {
    throw error;
  }
};
// recommend topic for user
const getTopicCourses = async (id: string, limit: number) => {
  try {
    const queryCheckExistCourse = `SELECT * FROM course WHERE topicId = ${id} limit ${
      limit ? limit : 10
    }`;
    return new Promise<dataListResponse<ICourse>>((resolve, reject) => {
      db.connectionDB.query(queryCheckExistCourse, (error, course, fields) => {
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
          data: course as ICourse[],
          message: "Get courses topic successfully",
        });
      });
    });
  } catch (error) {
    throw error;
  }
};

// recommend category for user
interface ITopic {
  topic_id: number;
  title: string;
  description: string;
  course_count: string;
}
const getTopicCategory = async (limit?: number) => {
  try {
    const query = `
      SELECT topic.topic_id, topic.title, topic.description, COUNT(course.topic_id) as course_count
      FROM topic 
      LEFT JOIN course ON course.topic_id = topic.topic_id
      GROUP BY topic.topic_id, topic.title
      LIMIT ${limit ? limit : 8}
    `;
    return new Promise<dataListResponse<ITopic>>((resolve, reject) => {
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
          data: course as ITopic[],
          message: "Get topic successfully",
        });
      });
    });
  } catch (error) {
    throw error;
  }
};
export default {
  getCoursesRecommend,
  getTopicCourses,
  getTopicCategory,
};
