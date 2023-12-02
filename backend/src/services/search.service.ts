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
  [0]: { course: ICourse; teacher: ITeacher; topic: ITopic; user: IUser }[];
  [1]: { teacher: ITeacher; user: IUser }[];
  [2]: { topic: ITopic; "": { course_count: number } }[];
}

const search = async (keyword: string, limit: number) => {
  try {
    const query1 = `SELECT * 
    FROM course 
    JOIN teacher ON course.teacher_id = teacher.teacher_id 
    JOIN topic ON course.topic_id = topic.topic_id 
    JOIN user ON teacher.username = user.username 
    WHERE course.title LIKE ? AND course.status LIMIT ${limit ? limit : 10};
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
