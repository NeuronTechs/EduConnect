import { count } from "console";
import db from "../config/connectDB";
import { dataListResponse } from "../constant/type";
import { QueryError } from "mysql2";

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
  isBuy?: boolean;
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
  order_items?: {
    order_items_id: string;
    student_id: string;
    course_id: string;
    price: number;
    createdAt: string;
  };
}
// Transform the nested results into the desired format
const formatCourse = (courses: ICourseResult[]) => {
  return courses.map((result) => {
    return {
      ...result?.course,
      teacher: result.teacher,
      user: result.user,
      topic: result.topic,
      total_student: result.transactions?.total_student,
      total_review: result.review?.total_review,
      ranking: result.review?.score_review,
      isBuy: result.order_items?.student_id ? true : false,
    };
  });
};

// get courses recommend for user
const getCoursesRecommend = async (limit: number, userId: string) => {
  try {
    const queryCheckExistCourse = `SELECT course.*, teacher.*, user.*, topic.*, order_items.*, total_student, total_review, score_review
    FROM course JOIN teacher ON course.teacher_id = teacher.teacher_id 
    JOIN user ON teacher.username = user.username  
    JOIN topic ON course.topic_id = topic.topic_id 
    LEFT JOIN (SELECT course_id, COUNT(student_id) as total_student 
    FROM transactions GROUP BY course_id) as transactions ON transactions.course_id = course.course_id
    LEFT JOIN (SELECT course_id, AVG(rating) as score_review, COUNT(review_id) as total_review 
    FROM review GROUP BY course_id) as review ON review.course_id = course.course_id
    LEFT JOIN order_items ON order_items.course_id = course.course_id AND order_items.student_id = ?
    WHERE course.status = 2 
    ORDER BY score_review DESC
    LIMIT ?`;

    return new Promise<dataListResponse<ICourse>>((resolve, reject) => {
      db.connectionDB.query(
        {
          sql: queryCheckExistCourse,
          values: [userId, limit ? limit : 10],
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
          resolve({
            status: 200,
            data: formatCourse(results) as ICourse[],
            message: "Get courses successfully",
          });
        }
      );
    });
  } catch (error) {
    throw error;
  }
};

// get courses by topic

const getTopicCourses = async (id: string, limit: number, userId: string) => {
  try {
    const queryCheckExistCourse = `SELECT course.*, teacher.*, user.*, topic.* , order_items.*, total_student, total_review, score_review
    FROM course 
    JOIN teacher ON course.teacher_id = teacher.teacher_id 
    JOIN topic ON course.topic_id = topic.topic_id 
    JOIN user ON teacher.username = user.username  
    LEFT JOIN (SELECT course_id, COUNT(student_id) as total_student 
    FROM transactions GROUP BY course_id) as transactions ON transactions.course_id = course.course_id
    LEFT JOIN (SELECT course_id, AVG(rating) as score_review, COUNT(review_id) as total_review 
    FROM review GROUP BY course_id) as review ON review.course_id = course.course_id
    LEFT JOIN order_items ON order_items.course_id = course.course_id AND order_items.student_id = ?
    WHERE topic.topic_id = ? AND course.status = 2
    LIMIT ?`;
    return new Promise<dataListResponse<ICourse>>((resolve, reject) => {
      db.connectionDB.query(
        {
          sql: queryCheckExistCourse,
          values: [userId, id, limit ? limit : 10],
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

          resolve({
            status: 200,
            data: formatCourse(results) as ICourse[],
            message: "Get courses topic successfully",
          });
        }
      );
    });
  } catch (error) {
    throw error;
  }
};
// get topics category
const getTopicCategory = async (limit?: number) => {
  try {
    const query = `
      SELECT topic.topic_id, topic.title, topic.description, COUNT(course.topic_id) as course_count
      FROM topic 
      LEFT JOIN course ON course.topic_id = topic.topic_id AND course.status = 2
      GROUP BY topic.topic_id, topic.title
      ORDER BY course_count DESC
      LIMIT ?
    `;
    return new Promise<dataListResponse<ITopic>>((resolve, reject) => {
      db.connectionDB.query(
        { sql: query, values: [limit ? limit : 8] },
        (error, course) => {
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
        }
      );
    });
  } catch (error) {
    throw error;
  }
};
const getAllTopic = async () => {
  try {
    const query = `
      SELECT topic.topic_id, topic.title, topic.description , COUNT(course.topic_id) as course_count FROM topic 
      LEFT JOIN course ON course.topic_id = topic.topic_id AND course.status = 2
      GROUP BY topic.topic_id, topic.title
      ORDER BY course_count DESC;
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
  getAllTopic,
};
