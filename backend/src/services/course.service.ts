import { ResultSetHeader, RowDataPacket } from "mysql2";
import db from "../config/connectDB";
import { generateRandomString } from "../config/randomString";
import {
  IComplaint,
  ICourse,
  ICourseDetail,
  ICourseOverview,
} from "../constant/course";
import {
  dataListResponse,
  dataResponse,
  updateResponse,
} from "../constant/type";
import { ISession } from "../constant/session";
import { convertTimestampToDateTime, generateID } from "../constant/utils";

const create = async (data: ICourse): Promise<dataResponse<ICourse>> => {
  data.course_id = generateRandomString();
  const sql = `INSERT INTO course SET ?`;
  return new Promise<dataResponse<ICourse>>((resolve, reject) => {
    db.connectionDB.query(sql, data, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve({
        status: 200,
        data: { ...data },
        message: "Created successfully",
      });
    });
  });
};

const getAll = async (
  page: number,
  pageSize: number
): Promise<dataListResponse<ICourse>> => {
  const offset = (page - 1) * pageSize;
  const sql = `SELECT * FROM course LIMIT ?, ?`;
  return new Promise<dataListResponse<ICourse>>((resolve, reject) => {
    db.connectionDB.query(
      sql,
      [offset, pageSize],
      (err, result: RowDataPacket[]) => {
        if (err) {
          reject(err);
          return;
        }
        resolve({
          status: 200,
          data: result as ICourse[],
          message: "Success",
        });
      }
    );
  });
};

const getById = async (id: string): Promise<dataResponse<ICourse>> => {
  const sql = `SELECT * FROM course WHERE course_id = ?`;
  return new Promise<dataResponse<ICourse>>((resolve, reject) => {
    db.connectionDB.query(sql, [id], (err, result: RowDataPacket[]) => {
      if (err) {
        reject(err);
        return;
      }
      if (result.length === 0) {
        resolve({ status: 404, message: "Course not found" });
        return;
      }
      resolve({ status: 200, data: result[0] as ICourse, message: "Success" });
    });
  });
};
const updateById = async (
  id: string,
  data: ICourse
): Promise<updateResponse> => {
  const sql = `UPDATE course SET ? WHERE course_id = ?`;
  return new Promise<updateResponse>((resolve, reject) => {
    db.connectionDB.query(sql, [data, id], (err, result: ResultSetHeader) => {
      if (err) {
        reject(err);
        return;
      }
      if (result.affectedRows === 0) {
        resolve({ status: 404, message: "Course not found" });
        return;
      }

      resolve({ status: 200, message: "Updated successfully" });
    });
  });
};

const deleteById = async (id: string): Promise<updateResponse> => {
  const sql = `DELETE FROM course WHERE course_id = ?`;
  return new Promise<updateResponse>((resolve, reject) => {
    db.connectionDB.query(sql, [id], (err, result: ResultSetHeader) => {
      if (err) {
        reject(err);
        return;
      }
      if (result.affectedRows === 0) {
        resolve({ status: 404, message: "Course not found" });
        return;
      }
      resolve({ status: 200, message: "Deleted successfully" });
    });
  });
};
const getCourseByTeacherId = async (
  teacher_id: string
): Promise<dataListResponse<ICourse>> => {
  const sql = `SELECT * FROM course WHERE teacher_id = ?`;
  return new Promise<dataListResponse<ICourse>>((resolve, reject) => {
    db.connectionDB.query(sql, [teacher_id], (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve({ status: 200, data: result as ICourse[], message: "Success" });
    });
  });
};

const getCourseByStudentId = async (
  student_id: string
): Promise<dataListResponse<ICourse>> => {
  const sql = `SELECT 
    c.*, 
    t.teacher_id as teacher_id, 
    t.username as teacher_name, 
    s.avatar as teacher_avatar,
    COUNT(DISTINCT sp.lecture_id) as completed_lectures,
    (SELECT COUNT(*) FROM lecture l JOIN session ss ON l.session_id = ss.session_id WHERE ss.course_id = c.course_id) as total_lectures
FROM 
    course c
JOIN 
    teacher t ON c.teacher_id = t.teacher_id 
JOIN 
    user s ON t.username = s.username
LEFT JOIN 
    student_progress sp ON c.course_id = sp.course_id AND sp.student_id = ?
WHERE 
    c.course_id IN (SELECT course_id FROM order_items WHERE student_id = ?)
GROUP BY 
    c.course_id;`;
  return new Promise<dataListResponse<ICourse>>((resolve, reject) => {
    db.connectionDB.query(sql, [student_id, student_id], (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve({ status: 200, data: result as ICourse[], message: "Success" });
    });
  });
};

const getCourseByTopicId = async (
  category_id: string
): Promise<dataListResponse<ICourse>> => {
  const sql = `SELECT * FROM course WHERE topic_id = ?`;
  return new Promise<dataListResponse<ICourse>>((resolve, reject) => {
    db.connectionDB.query(sql, [category_id], (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve({ status: 200, data: result as ICourse[], message: "Success" });
    });
  });
};

// get course details with session and lecture of session
// Define a function that retrieves course details for a given course ID
/**
 * Retrieves the details of a course including its sessions and lectures.
 * @param course_id - The ID of the course to retrieve details for.
 * @returns A Promise that resolves to a dataResponse object containing the course details.
 */
const getCourseDetails = async (
  course_id: string,
  user_id: string,
  role: string
): Promise<dataResponse<ICourseDetail>> => {
  // Define the SQL query to retrieve course details
  const sql = `SELECT 
  c.course_id,
  c.title as course_name,
  c.description as course_description,
  s.session_id,
  s.name AS session_name,
  l.lecture_id,
  l.name AS lecture_name,
  l.description,
  l.source,
  l.type,
  l.duration,
  sp.progress AS has_watched,
  CEIL((SELECT COUNT(*) FROM comments WHERE lecture_id = l.lecture_id AND isReply="false") / 5) as comment_pages,
  (SELECT COUNT(*) FROM lecture l JOIN session ss ON l.session_id = ss.session_id WHERE ss.course_id = c.course_id) as total_lectures ,
  (select count(*)   from student_progress where student_progress.course_id = ? AND student_progress.student_id = ? AND progress !=0 AND progress IS NOT NULL) as completed_lectures
FROM 
  Session s
JOIN 
  Lecture l ON s.session_id = l.session_id
JOIN 
  Course c ON s.course_id = c.course_id
LEFT JOIN 
  student_progress sp ON sp.lecture_id = l.lecture_id AND sp.student_id = ?
LEFT JOIN
  lecture_quiz lq ON lq.lecture_id = l.lecture_id AND l.type = 'quiz'
LEFT JOIN
  quiz_result qr ON qr.quiz_id = lq.quiz_id AND qr.student_id = ? AND l.type = 'quiz'
WHERE 
 (s.course_id = ? and  c.course_id IN (SELECT course_id FROM order_items WHERE student_id = ?)) or (s.course_id = ? and c.teacher_id = ?) or (? = 2 and s.course_id = ?)
ORDER BY 
  s.createdAt,s.session_id, l.lecture_id;`;

  // Execute the SQL query and return a Promise that resolves to the course details
  return new Promise<dataResponse<ICourseDetail>>((resolve, reject) => {
    db.connectionDB.query(
      sql,
      [
        course_id,
        user_id,
        user_id,
        user_id,
        course_id,
        user_id,
        course_id,
        user_id,
        role,
        course_id,
      ],
      (err, result: RowDataPacket[]) => {
        if (err) {
          reject(err);
          return;
        }
        // Parse the query result and create an ICourseDetail object
        if (result.length === 0)
          resolve({
            status: 404,
            message: "Course not found",
          });
        else {
          const resultData: ICourseDetail = {
            course_id: result[0].course_id,
            title: result[0].course_name,
            description: result[0].course_description,
            completed_lectures: result[0].completed_lectures,
            total_lectures: result[0].total_lectures,
            sessions: [],
          };
          // Iterate over the query result and group lectures by session
          let sample = {
            session_id: result[0].session_id,
            session_name: result[0].session_name,
          };
          let lectures: any[] = [];
          for (const item of result) {
            if (sample.session_id === item.session_id) {
              lectures.push({ ...item });
            } else {
              const { session_id, session_name } = sample;
              const temp: ISession = {
                session_id,
                name: session_name,
                course_id: resultData.course_id,
                lectures,
              };
              resultData.sessions.push(temp);
              lectures = [];
              sample.session_id = item.session_id;
              sample.session_name = item.session_name;
              lectures.push({
                lecture_id: item.lecture_id,
                lecture_name: item.lecture_name,
                description: item.description,
                session_id: item.session_id,
                source: item.source,
                type: item.type,
                has_watched: item.has_watched,
              });
            }
          }

          // Add the last session to the ICourseDetail object
          const { session_id, session_name } = sample;
          const temp: ISession = {
            session_id,
            name: session_name,
            course_id: resultData.course_id,
            lectures,
          };
          resultData.sessions.push(temp);

          // Return the course details as a dataResponse object
          resolve({
            status: 200,
            data: resultData as ICourseDetail,
            message: "Success",
          });
        }
      }
    );
  });
};

const getOverviewCourse = async (
  course_id: string
): Promise<dataResponse<any>> => {
  try {
    const sql = `SELECT c.course_id ,c.title as course_name,c.description as course_description,s.session_id, s.name AS session_name, l.lecture_id, l.name AS lecture_name, l.description, l.source, l.type, l.duration, c.price, c.discount, c.study, c.requirement, c.level, c.language, c.image, tc.teacher_id, us.full_name, tc.educational_level, us.avatar, GROUP_CONCAT(DISTINCT ot.student_id) as student_id
    FROM educonnectdb.session s
    JOIN educonnectdb.lecture l ON s.session_id = l.session_id
    JOIN educonnectdb.course c ON s.course_id = c.course_id
    JOIN educonnectdb.teacher tc on c.teacher_id = tc.teacher_id
    JOIN educonnectdb.user us on tc.username = us.username
    LEFT JOIN educonnectdb.order_items ot on ot.course_id = c.course_id
    WHERE s.course_id = ?
    GROUP BY
    c.course_id, c.title, c.description, s.session_id, s.name, l.lecture_id, l.name, l.description, l.source, l.type, l.duration, c.price, c.discount,c.study,c.requirement,c.level,c.language,c.image,tc.teacher_id,us.full_name,tc.educational_level,us.avatar
    ORDER BY s.session_id, l.lecture_id;`;

    return new Promise<any>((resolve, reject) => {
      db.connectionDB.query(
        sql,
        [course_id],
        (err, result: RowDataPacket[]) => {
          if (err) {
            reject({
              status: 404,
              data: {},
              message: err,
            });
            return;
          } else {
            if (result.length === 0) {
              resolve({
                status: 404,
                data: {},
                message: "Course doesn't existed",
              });
              return;
            }
            const resultData: ICourseOverview = {
              course_id: result[0].course_id,
              title: result[0].course_name,
              image: result[0].image,
              description: result[0].course_description,
              price: result[0].price,
              discount: result[0].discount,
              requirement: result[0].requirement,
              study: result[0].study,
              level: result[0].level,
              language: result[0].language,
              timeLine: "MAX",
              totalTime: result.reduce((total, data) => {
                return parseInt(data.duration) + total;
              }, 0),
              student: "MAX",
              totalLecture: result.length,
              teacher_id: result[0].teacher_id,
              fullName: result[0].full_name,
              educational_level: result[0].educational_level,
              avatar: result[0].avatar,
              student_id: result[0].student_id,
              sessions: [],
            };

            let sample = {
              session_id: result[0].session_id,
              session_name: result[0].session_name,
            };
            let lectures: any[] = [];
            for (const item of result) {
              if (sample.session_id === item.session_id) {
                lectures.push({
                  lecture_id: item.lecture_id,
                  lecture_name: item.lecture_name,
                  description: item.description,
                  source: item.source,
                  type: item.type,
                  time: item.duration,
                });
              } else {
                const { session_id, session_name } = sample;
                const temp: ISession = {
                  session_id,
                  name: session_name,
                  lectures,
                };
                resultData.sessions.push(temp);
                lectures = [];
                sample.session_id = item.session_id;
                sample.session_name = item.session_name;
                lectures.push({
                  lecture_id: item.lecture_id,
                  lecture_name: item.lecture_name,
                  description: item.description,
                  source: item.source,
                  type: item.type,
                  time: item.duration,
                });
              }
            }

            const { session_id, session_name } = sample;
            const temp: ISession = {
              session_id,
              name: session_name,
              lectures,
            };
            resultData.sessions.push(temp);

            resolve({
              status: 200,
              data: resultData as ICourseOverview,
              message: "Success",
            });
          }
        }
      );
    });
  } catch (error) {
    throw error;
  }
};

const addTransactionInCourse = (
  student_id: String,
  course_id: String,
  amount: Number,
  status: String,
  transaction_id: string
): Promise<any> => {
  try {
    const query = `INSERT INTO transactions (transaction_id, student_id,course_id,amount,status,createdAt) VALUES (?,?,?,?,?,?)
      `;
    const nowString = convertTimestampToDateTime();
    return new Promise((resolve, reject) => {
      db.connectionDB.query(
        query,
        [transaction_id, student_id, course_id, amount, status, nowString],
        (error, transaction, fields) => {
          if (error) {
            reject({
              status: false,
              data: {},
              message: error,
            });
            return;
          }
          resolve({
            status: true,
            data: {
              transaction_id,
              student_id,
              course_id,
              amount,
              status,
              nowString,
            },
            message: "Add transaction success",
          });
        }
      );
    });
  } catch (error) {
    throw error;
  }
};

const addToCourse = (
  student_id: String,
  course_id: String,
  amount: Number
): Promise<any> => {
  try {
    const query = `INSERT INTO order_items (order_items_id, student_id,course_id, price ,createdAt) VALUES (?,?,?,?,?)
      `;
    const order_items_id = "order_" + generateID();
    const nowString = convertTimestampToDateTime();
    return new Promise((resolve, reject) => {
      db.connectionDB.query(
        query,
        [order_items_id, student_id, course_id, amount, nowString],
        (error, transaction, fields) => {
          if (error) {
            reject({
              status: false,
              data: {},
              message: error,
            });
            return;
          }
          resolve({
            status: true,
            data: {
              order_items_id,
              student_id,
              course_id,
              amount,
              nowString,
            },
            message: "Add course success",
          });
        }
      );
    });
  } catch (error) {
    throw error;
  }
};

const complaintCourse = (
  data: IComplaint,
  files:
    | {
        [fieldname: string]: Express.Multer.File[];
      }
    | Express.Multer.File[]
    | undefined
): Promise<any> => {
  try {
    data.complaint_id = generateRandomString();
    data.createdAt = convertTimestampToDateTime();

    let fileData: string | undefined = "";
    if (files) {
      fileData = JSON.stringify(
        Object.values(files).map((file) => {
          return file.path;
          // return {
          //   mimetype: file.mimetype,
          //   path: file.path,
          // };
        })
      );
    }
    // if (fileData) {
    //   console.log(fileData);
    //   data.image = fileData;
    // }
    data.image = fileData;
    const sql = `INSERT INTO complaint SET ?`;
    return new Promise<any>((resolve, reject) => {
      db.connectionDB.query(sql, data, (err, result) => {
        if (err) {
          reject({
            status: 400,
            message: err,
          });
          return;
        }
        resolve({
          status: 200,
          data: data,
          message: "Complaint successfully",
        });
      });
    });
  } catch (error) {
    throw error;
  }
};

const getComplaintCourse = (page: number, pageSize: number): Promise<any> => {
  try {
    const offset = (page - 1) * pageSize;
    const countQuery = "SELECT COUNT(*) as total FROM complaint";
    const query = `SELECT complaint.complaint_id, complaint.title, complaint.content, complaint.image, complaint.createdAt ,complaint.student_id, complaint.course_id, course.title as course_name, user.full_name, complaint.status FROM educonnectdb.complaint join educonnectdb.student on complaint.student_id = student.student_id
    join educonnectdb.course on course.course_id = complaint.course_id
    join educonnectdb.user on user.username = student.username order by createdAt LIMIT ?, ?`;
    return new Promise((resolve, reject) => {
      db.connectionDB.query(
        countQuery,
        (error, complaints: RowDataPacket[], fields) => {
          if (error) {
            reject({
              status: false,
              data: {},
              message: error,
            });
            return;
          }
          db.connectionDB.query(
            query,
            [offset, pageSize],
            (dataErr, result: RowDataPacket[]) => {
              if (dataErr) {
                reject({
                  status: false,
                  data: {},
                  message: error,
                });
              } else {
                const totalPage =
                  complaints[0].total / pageSize < 1
                    ? 1
                    : Math.ceil(complaints[0].total / pageSize);
                resolve({
                  status: true,
                  data: result,
                  totalPage: totalPage,
                  message: "Get complaint success",
                });
              }
            }
          );
        }
      );
    });
  } catch (error) {
    throw error;
  }
};

const getComplaintDetail = (complaint_id: string): Promise<any> => {
  try {
    const query = `SELECT complaint.complaint_id, complaint.status, complaint.student_id, user.full_name, user.email, complaint.createdAt,
    complaint.title as complaint_title, complaint.content, complaint.image as image_complaint, complaint.session_id, session.session_id, session.name as session_name,
    lecture.lecture_id, lecture.name as lecture_name, lecture.type, lecture.source, complaint.course_id, course.title as course_title, course.teacher_id, course.image as image_course
    FROM educonnectdb.complaint join educonnectdb.student on complaint.student_id = student.student_id
    join educonnectdb.course on course.course_id = complaint.course_id
    join educonnectdb.user on user.username = student.username 
    join educonnectdb.session on session.session_id = complaint.session_id 
    join educonnectdb.lecture on lecture.lecture_id = complaint.lecture_id
    where complaint.complaint_id = ?`;
    return new Promise((resolve, reject) => {
      db.connectionDB.query(
        query,
        [complaint_id],
        (error, complaint: RowDataPacket[], fields) => {
          if (error) {
            reject({
              status: false,
              data: {},
              message: error,
            });
            return;
          } else {
            if (complaint.length === 0) {
              resolve({
                status: false,
                data: {},
                message: "Complaint not found",
              });
            } else {
              resolve({
                status: true,
                data: complaint[0],
                message: "Get complaint success",
              });
            }
          }
        }
      );
    });
  } catch (error) {
    throw error;
  }
};

const resolveComplaintCourse = (
  complaint_id: string,
  course_id: string,
  option: string
): Promise<any> => {
  try {
    let query: string;
    if (option === "0") {
      query = `UPDATE educonnectdb.course SET status = "0" WHERE course_id = ?`;
    } else {
      query = `UPDATE educonnectdb.course SET status = "1" WHERE course_id = ?`;
    }
    return new Promise((resolve, reject) => {
      db.connectionDB.query(
        query,
        [course_id],
        (error, complaint: RowDataPacket[], fields) => {
          if (error) {
            reject({
              status: false,
              data: {},
              message: error,
            });
            return;
          } else {
            db.connectionDB.query(
              `UPDATE educonnectdb.complaint SET status = "1" WHERE complaint_id = ?`,
              [complaint_id],
              (dataErr, result: RowDataPacket[]) => {
                if (dataErr) {
                  reject({
                    status: false,
                    data: {},
                    message: dataErr,
                  });
                  return;
                }
                resolve({
                  status: true,
                  message: "Resolve success",
                });
              }
            );
          }
        }
      );
    });
  } catch (error) {
    throw error;
  }
};

export default {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
  getCourseByTeacherId,
  getCourseByStudentId,
  getCourseDetails,
  getOverviewCourse,
  addTransactionInCourse,
  addToCourse,
  complaintCourse,
  getComplaintCourse,
  getComplaintDetail,
  resolveComplaintCourse,
};
