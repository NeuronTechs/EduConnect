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
  session_id: string;
  name: string;
  course_id: string;
  lessons: ILecture[] | string[];
  createdAt?: string;
  updatedAt?: string;
}

interface ILecture {
  lecture_id: string;
  name: string;
  description: string;
  content: string;
  type: string;
  session_id: string;
  created_at?: string;
  updated_at?: string;
}

interface IGetSectionResult {
  [0]: ISection[];
  [1]: ILecture[];
}
const getSectionOfCourse = async (course_id: string) => {
  const query = `SELECT * FROM session WHERE course_id = ?; SELECT lecture.* FROM session LEFT JOIN lecture ON session.session_id = lecture.session_id WHERE session.course_id = ?`;
  return new Promise<dataListResponse<ISection>>((resolve, rejects) => {
    try {
      connectDB.connectionDB.query(
        {
          sql: query,
          values: [`${course_id}`, `${course_id}`],
        },
        async (err: QueryError, result: IGetSectionResult) => {
          if (err) {
            rejects({
              status: 400,
              data: [],
              message: err.message,
            });
            return;
          }
          const data = result[0].map((session: any) => {
            const lecture = result[1].filter(
              (lecture: ILecture) => lecture.session_id === session.session_id
            );
            return {
              ...session,
              lessons: lecture.sort(
                (a: ILecture, b: ILecture) =>
                  session?.lessons?.indexOf(a.lecture_id) -
                  session?.lessons?.indexOf(b.lecture_id)
              ),
            };
          });

          resolve({
            status: 200,
            data: data ? data : ([] as ISection[]),
            message: "Get section successfully",
          });
        }
      );
    } catch (err) {
      rejects({
        status: 500,
        data: [],
        message: err,
      });
    }
  });
};

const createCourseSection = async (section: ISection) => {
  section.session_id = uuidv4();
  section.createdAt = new Date().toISOString().slice(0, 19).replace("T", " ");
  section.updatedAt = new Date().toISOString().slice(0, 19).replace("T", " ");
  const query = `INSERT INTO session SET ?`;
  return new Promise<dataResponse<ISection>>((resolve, rejects) => {
    try {
      connectDB.connectionDB.query(
        { sql: query, values: [section] },
        (err: QueryError, result: ISection) => {
          if (err) {
            rejects({
              status: 400,
              data: [],
              message: err.message,
            });
            return;
          }
          resolve({
            status: 200,
            data: section as ISection,
            message: "Created successfully",
          });
        }
      );
    } catch (err) {
      rejects({
        status: 500,
        data: [],
        message: err,
      });
    }
  });
};
const updateSectionOfCourse = async (section: ISection) => {
  section.createdAt = section.createdAt
    ? section.createdAt.slice(0, 19).replace("T", " ")
    : new Date().toISOString().slice(0, 19).replace("T", " ");
  section.updatedAt = new Date().toISOString().slice(0, 19).replace("T", " ");
  const query = `UPDATE session SET ? WHERE session_id = ?`;
  return new Promise<dataResponse<ISection>>((resolve, rejects) => {
    try {
      connectDB.connectionDB.query(
        { sql: query, values: [section, section.session_id] },
        (err: QueryError, result: ISection) => {
          if (err) {
            rejects({
              status: 400,
              data: [],
              message: err.message,
            });
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
      rejects({
        status: 500,
        data: [],
        message: err,
      });
    }
  });
};
const deleteSectionOfCourse = async (section_id: string) => {
  const query = `DELETE FROM session WHERE session_id = ?`;
  return new Promise<dataResponse<ISection>>((resolve, rejects) => {
    try {
      connectDB.connectionDB.query(
        { sql: query, values: [section_id] },
        (err: QueryError, result: ISection) => {
          if (err) {
            rejects({
              status: 400,
              data: [],
              message: err.message,
            });
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
      rejects({
        status: 500,
        data: [],
        message: err,
      });
    }
  });
};

const createCourseSectionLesson = async (lecture: ILecture) => {
  lecture.lecture_id = uuidv4();
  // lecture.created_at = new Date().toISOString().slice(0, 19).replace("T", " ");
  // lecture.updated_at = new Date().toISOString().slice(0, 19).replace("T", " ");

  return new Promise<dataResponse<ILecture>>((resolve, rejects) => {
    try {
      if (lecture.type === "quiz") {
        const data = {
          quiz_id: uuidv4(),
          lecture_id: lecture.lecture_id,
          timeout: new Date().toISOString().slice(0, 19).replace("T", " "),
          duration: 0,
          durationUnit: "m",
          isRandom: false,
          isShowAnswer: false,
          type: "",
          passPercent: 0,
          retakePercent: 0,
          content: "",
          create_at: new Date().toISOString().slice(0, 19).replace("T", " "),
          update_at: new Date().toISOString().slice(0, 19).replace("T", " "),
        };
        const query = `INSERT INTO lecture SET ?; INSERT INTO lecture_quiz SET ?`;
        connectDB.connectionDB.query(
          { sql: query, values: [lecture, data] },
          (err: QueryError, result: ILecture) => {
            if (err) {
              rejects({
                status: 400,
                data: [],
                message: err.message,
              });
              return;
            }
            resolve({
              status: 200,
              data: lecture as ILecture,
              message: "Created successfully",
            });
          }
        );
      } else {
        const query = `INSERT INTO lecture SET ?;`;
        connectDB.connectionDB.query(
          { sql: query, values: [lecture] },
          (err: QueryError, result: ILecture) => {
            if (err) {
              rejects({
                status: 400,
                data: [],
                message: err.message,
              });
              return;
            }
            resolve({
              status: 200,
              data: lecture as ILecture,
              message: "Created successfully",
            });
          }
        );
      }
    } catch (err) {
      rejects({
        status: 500,
        data: [],
        message: err,
      });
    }
  });
};
const updateCourseSectionLesson = async (lecture: ILecture) => {
  const query = `UPDATE lecture SET ? WHERE lecture_id = ?`;
  return new Promise<dataResponse<ILecture>>((resolve, rejects) => {
    try {
      connectDB.connectionDB.query(
        { sql: query, values: [lecture, lecture.lecture_id] },
        (err: QueryError, result: ILecture) => {
          if (err) {
            rejects({
              status: 400,
              data: [],
              message: err.message,
            });
            return;
          }
          resolve({
            status: 200,
            data: lecture as ILecture,
            message: "Updated successfully",
          });
        }
      );
    } catch (err) {
      rejects({
        status: 500,
        data: [],
        message: err,
      });
    }
  });
};
const deleteCourseSectionLesson = async (lecture_id: string) => {
  const query = `DELETE FROM lecture WHERE lecture_id = ?`;
  return new Promise<dataResponse<ILecture>>((resolve, rejects) => {
    try {
      connectDB.connectionDB.query(
        { sql: query, values: [lecture_id] },
        (err: QueryError, result: ILecture) => {
          if (err) {
            rejects({
              status: 400,
              data: [],
              message: err.message,
            });
            return;
          }
          resolve({
            status: 200,
            data: result as ILecture,
            message: "Deleted successfully",
          });
        }
      );
    } catch (err) {
      rejects({
        status: 500,
        data: [],
        message: err,
      });
    }
  });
};
const getLessonOfSection = async (section_id: string) => {
  const query = `SELECT * FROM lecture WHERE section_id = ?`;
  return new Promise<dataListResponse<ILecture>>((resolve, rejects) => {
    try {
      connectDB.connectionDB.query(
        { sql: query, values: [section_id] },
        (err: QueryError, result: ILecture[]) => {
          if (err) {
            rejects({
              status: 400,
              data: [],
              message: err.message,
            });
            return;
          }
          resolve({
            status: 200,
            data: result as ILecture[],
            message: "Get lesson successfully",
          });
        }
      );
    } catch (err) {
      rejects({
        status: 500,
        data: [],
        message: err,
      });
    }
  });
};
// const createQuiz = async (quiz: any) => {
//   quiz.quiz_id = uuidv4();
//   quiz.created_at = new Date().toISOString().slice(0, 19).replace("T", " ");
//   quiz.updated_at = new Date().toISOString().slice(0, 19).replace("T", " ");
//   const query = `INSERT INTO lesson_quiz SET ?`;
//   return new Promise<dataResponse<any>>((resolve, rejects) => {
//     try {
//       connectDB.connectionDB.query(
//         { sql: query, values: [quiz] },
//         (err: QueryError, result: any) => {
//           if (err) {
//             rejects({
//               status: 400,
//               data: [],
//               message: err.message,
//             });
//             return;
//           }
//           quiz.quiz_id = result.insertId;
//           resolve({
//             status: 200,
//             data: quiz as any,
//             message: "Created successfully",
//           });
//         }
//       );
//     } catch (err) {
//       rejects({
//         status: 500,
//         data: [],
//         message: err,
//       });
//     }
//   });
// };

export default {
  createCourseSection,
  getSectionOfCourse,
  updateSectionOfCourse,
  deleteSectionOfCourse,
  createCourseSectionLesson,
  updateCourseSectionLesson,
  deleteCourseSectionLesson,
  getLessonOfSection,
};
