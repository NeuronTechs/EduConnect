import { QueryError } from "mysql2";
import connectDB from "../config/connectDB";
import { dataListResponse, dataResponse } from "../constant/type";
interface ISearchService {
  search(keyword: string): Promise<dataListResponse<any>>;
}
interface ICourse {
  course_id: number;
  course_name: string;
  course_description: string;
  course_image: string;
  course_price: number;
  course_discount: number;
  course_status: number;
  course_created_at: string;
  course_updated_at: string;
  teacher_id: number;
  topic_id: number;
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
  user?: IUser;
}
interface ITopic {
  topic_id: number;
  title: string;
  description: string;
  image?: string;
  course_count?: number;
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
interface ISearch {
  courses?: ICourse[];
  teachers?: ITeacher[];
  topics?: ITopic[];
}
interface IResultSearch {
  [0]: {
    course: ICourse;
    teacher: ITeacher;
    topic: ITopic;
    user: IUser;
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
  }[];
  [1]: { teacher: ITeacher; user: IUser }[];
  [2]: { topic: ITopic; "": { course_count: number } }[];
}

const search = async (keyword: string, limit: number, userId: string) => {
  try {
    const query1 = `SELECT course.*, teacher.*, user.*, topic.*, order_items.* , total_student, total_review, score_review
    FROM course JOIN teacher ON course.teacher_id = teacher.teacher_id 
    JOIN user ON teacher.username = user.username 
    JOIN topic ON course.topic_id = topic.topic_id 
    LEFT JOIN (SELECT course_id, COUNT(student_id) as total_student 
    FROM transactions GROUP BY course_id) as transactions ON transactions.course_id = course.course_id
    LEFT JOIN (SELECT course_id, AVG(rating) as score_review, COUNT(review_id) as total_review
    FROM review GROUP BY course_id) as review ON review.course_id = course.course_id
    LEFT JOIN order_items ON order_items.course_id = course.course_id AND order_items.student_id = ? 
    WHERE course.title LIKE ? AND course.status = 2 LIMIT ${limit ? limit : 10};
    SELECT * 
    FROM teacher JOIN user ON teacher.username = user.username 
    WHERE (user.username LIKE ?  OR user.full_name LIKE ?) LIMIT ${
      limit ? limit : 10
    };
    SELECT topic.topic_id, topic.title, topic.description, COUNT(course.topic_id) as course_count FROM topic 
    LEFT JOIN course ON course.topic_id = topic.topic_id AND course.status = 2
    WHERE (topic.title LIKE ? OR topic.description LIKE ?)
    GROUP BY topic.topic_id, topic.title  LIMIT ${limit ? limit : 10}`;

    return new Promise<dataResponse<ISearch>>(async (resolve, reject) => {
      connectDB.connectionDB.query(
        {
          sql: query1,
          values: [
            userId,
            `%${keyword}%`,
            `%${keyword}%`,
            `%${keyword}%`,
            `%${keyword}%`,
            `%${keyword}%`,
          ],
          nestTables: true,
        },

        (error: QueryError, results: IResultSearch, fields) => {
          // console.log(results);
          if (error) {
            reject({
              status: 500,
              data: {},
              message: error,
            });
            return;
          }
          const courses = results[0].map((item) => {
            return {
              ...item.course,
              teacher: item.teacher,
              topic: item.topic,
              user: item.user,
              total_student: item.transactions?.total_student,
              total_review: item.review?.total_review,
              ranking: item.review?.score_review,
              isBuy: item.order_items?.student_id ? true : false,
            };
          });
          const teachers = results[1].map((item) => {
            return { ...item.teacher, user: item.user };
          });
          const topics = results[2].map((item) => {
            return { ...item.topic, course_count: item[""].course_count };
          });

          resolve({
            status: 200,
            data: {
              courses: courses as ICourse[],
              teachers: teachers as ITeacher[],
              topics: topics as ITopic[],
            } as ISearch,
            message: "search courses, teacher and topic successfully",
          });
        }
      );
    });
  } catch (error) {
    throw error;
  }
};
const suggestionSearch = async (keyword: string, limit: number) => {
  try {
    const query1 = `
    SELECT * FROM course 
    WHERE course.title LIKE ? AND course.status = 2 LIMIT ?`;

    return new Promise<dataResponse<ISearch>>(async (resolve, reject) => {
      connectDB.connectionDB.query(
        {
          sql: query1,
          values: [`%${keyword}%`, limit ? limit : 10],
        },

        (error: QueryError, results: ICourse[]) => {
          // console.log(results);
          if (error) {
            reject({
              status: 500,
              data: {},
              message: error,
            });
            return;
          }

          resolve({
            status: 200,
            data: {
              courses: results as ICourse[],
            } as ISearch,
            message: "search courses successfully",
          });
        }
      );
    });
  } catch (error) {
    throw error;
  }
};
export default { search, suggestionSearch };
