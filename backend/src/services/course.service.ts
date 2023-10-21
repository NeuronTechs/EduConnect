import { ResultSetHeader, RowDataPacket } from "mysql2";
import db from "../config/connectDB";
import { generateRandomString } from "../config/randomString";
import { ICourse } from "../constant/course";
import {
  dataListResponse,
  dataResponse,
  updateResponse,
} from "../constant/type";

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
  const sql = `SELECT * FROM course WHERE course_id IN (SELECT course_id FROM order_items WHERE student_id = ?)`;
  return new Promise<dataListResponse<ICourse>>((resolve, reject) => {
    db.connectionDB.query(sql, [student_id], (err, result) => {
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

export default {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
  getCourseByTeacherId,
  getCourseByStudentId,
};
