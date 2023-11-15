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
  [0]: ICourse[];
  [1]: ITeacher[];
  [2]: ITopic[];
}

const search = async (keyword: string, limit: number) => {
  try {
    const query1 = `SELECT * 
    FROM course 
    JOIN teacher ON course.teacher_id = teacher.teacher_id 
    JOIN topic ON course.topic_id = topic.topic_id 
    JOIN user ON teacher.username = user.username 
    WHERE course.title LIKE ? LIMIT ${limit ? limit : 10} ;
    SELECT * 
    FROM teacher JOIN user ON teacher.username = user.username 
    WHERE user.username LIKE ?  OR user.full_name LIKE ? LIMIT ${
      limit ? limit : 10
    };
    SELECT topic.topic_id, topic.title, topic.description, COUNT(course.topic_id) as course_count FROM topic 
    LEFT JOIN course ON course.topic_id = topic.topic_id
    WHERE topic.title LIKE ? OR topic.description LIKE ?
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

        (error, results: IResultSearch, fields) => {
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
              courses: results[0] as ICourse[],
              teachers: results[1] as ITeacher[],
              topics: results[2] as ITopic[],
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

export default { search };
