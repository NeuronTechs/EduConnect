import db from "../config/connectDB";
import { RowDataPacket } from "mysql2";
import { dataListResponse } from "../constant/type";

const getAllUser = (
  page: number,
  pageSize: number,
  txtSearch: string
): Promise<any> => {
  try {
    const offset = (page - 1) * pageSize;
    const countQuery =
      "SELECT COUNT(*) as total FROM user where (role = 0 or role = 1) AND full_name LIKE CONCAT('%', ?, '%')";
    const query = `SELECT
    user.username, teacher.teacher_id as user_id, user.full_name, user.email, user.avatar, user.address, teacher.educational_level, teacher.major, teacher.school, user.createdAt as timeStart, user.role, user.status
    FROM
    teacher
    JOIN
        user ON teacher.username = user.username
    WHERE
        user.role = 1 AND user.full_name LIKE CONCAT('%', ?, '%')

    UNION

    SELECT
        user.username, student.student_id as user_id, user.full_name, user.email, user.avatar, user.address, student.educational_level, student.major, student.school, user.createdAt as timeStart, user.role, user.status
    FROM
        student
    JOIN
        user ON student.username = user.username
    WHERE
        user.role = 0 AND user.full_name LIKE CONCAT('%', ?, '%')
    LIMIT ?,?`;

    return new Promise((resolve, reject) => {
      db.connectionDB.query(
        countQuery,
        [txtSearch],
        (error, total: RowDataPacket[], fields) => {
          if (error) {
            reject({
              status: false,
              data: {},
              message: error,
            });
            return;
          }
          const totalPage =
            total[0].total / pageSize < 1
              ? 1
              : Math.ceil(total[0].total / pageSize);
          db.connectionDB.query(
            query,
            [txtSearch, txtSearch, offset, pageSize],
            (dataErr, result: RowDataPacket[]) => {
              if (dataErr) {
                reject({
                  status: false,
                  data: {},
                  message: error,
                });
              } else {
                resolve({
                  status: true,
                  data: result,
                  totalPage: totalPage,
                  message: "Get all user success",
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

const setStatusUser = (status: string, username: string): Promise<any> => {
  try {
    const query = `UPDATE educonnectdb.user SET status = ? WHERE username = ?`;
    return new Promise((resolve, reject) => {
      db.connectionDB.query(
        query,
        [status, username],
        (error, result: RowDataPacket[], fields) => {
          if (error) {
            reject({
              status: false,
              data: {},
              message: error,
            });
            return;
          } else {
            resolve({
              status: true,
              message: "Update success",
            });
          }
        }
      );
    });
  } catch (error) {
    throw error;
  }
};

interface ICourse {
  course_id: string;
  teacher_id: string;
  title: string;
  description: string;
  image: string;
  price: string;
  discount: string;
  level: string;
  status: string;
  username: string;
  total_page: number;
  language: string;
  createdAt: Date;
}

const getAllCourseWithTeacherData = async (
  page: number,
  pageSize: number,
  txtSearch: string,
  status: string
): Promise<dataListResponse<ICourse>> => {
  const offset = (page - 1) * pageSize;
  const sql =
    " Select c.*,t.username,t.teacher_id,CEIL((SELECT COUNT(*) FROM course c join teacher t on c.teacher_id = t.teacher_id where (c.title like  Concat('%',?,'%') or t.username like Concat('%', ? ,'%')) and (? = '2' or c.status = ?))/3) as total_page  from course c join teacher t on c.teacher_id = t.teacher_id where ( c.title like  Concat('%', ? ,'%') or t.username like Concat('%',?,'%'))  and (? = '2' or c.status = ?) limit ?,?";
  return new Promise<dataListResponse<ICourse>>((resolve, reject) => {
    db.connectionDB.query(
      sql,
      [
        txtSearch,
        txtSearch,
        status,
        status,
        txtSearch,
        txtSearch,
        status,
        status,
        offset,
        pageSize,
      ],
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

const setStatusCourse = async (
  status: string,
  course_id: string
): Promise<any> => {
  try {
    const query = `UPDATE course SET status = ? WHERE course_id = ?`;
    return new Promise((resolve, reject) => {
      db.connectionDB.query(
        query,
        [status, course_id],
        (error, result: RowDataPacket[], fields) => {
          if (error) {
            reject({
              status: false,
              data: {},
              message: error,
            });
            return;
          } else {
            resolve({
              status: true,
              message: "Update success",
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
  getAllUser,
  setStatusUser,
  getAllCourseWithTeacherData,
  setStatusCourse,
};
