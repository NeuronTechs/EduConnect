import { ResultSetHeader, RowDataPacket } from "mysql2";
import db from "../config/connectDB";
import { generateRandomString } from "../config/randomString";
import { ILecture } from "../constant/lecture";
import { IStudentProgress } from "../constant/student_progress";
import {
  dataListResponse,
  dataResponse,
  updateResponse,
} from "../constant/type";
import { v4 as uuidv4 } from "uuid";
const create = async (data: ILecture): Promise<dataResponse<ILecture>> => {
  data.lecture_id = uuidv4();
  const sql = `INSERT INTO lecture SET ?`;
  return new Promise<dataResponse<ILecture>>((resolve, reject) => {
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

const updateById = async (
  id: string,
  data: ILecture
): Promise<dataResponse<ILecture>> => {
  const sql = `UPDATE lecture SET ? WHERE lecture_id = ?`;
  return new Promise<dataResponse<ILecture>>((resolve, reject) => {
    db.connectionDB.query(sql, [data, id], (err, result: ResultSetHeader) => {
      if (err) {
        reject(err);
        return;
      }
      if (result.affectedRows === 0) {
        resolve({ status: 404, message: "Not Found" });
        return;
      }
      resolve({
        status: 200,
        data: { ...data },
        message: "Updated successfully",
      });
    });
  });
};

const deleteById = async (id: string): Promise<dataResponse<ILecture>> => {
  const sql = `DELETE FROM lecture WHERE lecture_id = ?`;
  return new Promise<dataResponse<ILecture>>((resolve, reject) => {
    db.connectionDB.query(sql, [id], (err, result: ResultSetHeader) => {
      if (err) {
        reject(err);
        return;
      }
      if (result.affectedRows === 0) {
        resolve({ status: 404, message: "Not Found" });
        return;
      }
      resolve({ status: 200, message: "Deleted successfully" });
    });
  });
};

const getBySessionId = async (
  id: string
): Promise<dataListResponse<ILecture>> => {
  const sql = `SELECT * FROM lecture WHERE session_id = ?`;
  return new Promise<dataListResponse<ILecture>>((resolve, reject) => {
    db.connectionDB.query(sql, [id], (err, result: RowDataPacket[]) => {
      if (err) {
        reject(err);
        return;
      }
      resolve({ status: 200, data: result as ILecture[], message: "Success" });
    });
  });
};

const getByLectureId = async (id: string): Promise<dataResponse<ILecture>> => {
  const sql = `SELECT * FROM lecture WHERE lecture_id = ?`;
  return new Promise<dataResponse<ILecture>>((resolve, reject) => {
    db.connectionDB.query(sql, [id], (err, result: RowDataPacket[]) => {
      if (err) {
        reject(err);
        return;
      }
      if (result.length === 0) {
        resolve({ status: 404, message: "Lecture not found" });
        return;
      }
      resolve({ status: 200, data: result[0] as ILecture, message: "Success" });
    });
  });
};

const createStudentProgress = async (
  data: IStudentProgress
): Promise<dataResponse<IStudentProgress>> => {
  data.updated_at = new Date();

  const sql = `INSERT INTO student_progress SET ?`;
  return new Promise<dataResponse<IStudentProgress>>((resolve, reject) => {
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

const updateStudentProgress = async (
  data: IStudentProgress
): Promise<updateResponse> => {
  data.updated_at = new Date();
  const sql = `UPDATE student_progress SET ? WHERE lecture_id = ? and student_id = ?`;
  return new Promise<updateResponse>((resolve, reject) => {
    db.connectionDB.query(
      sql,
      [data, data.lecture_id, data.student_id],
      (err, result: ResultSetHeader) => {
        if (err) {
          reject(err);
          return;
        }
        if (result.affectedRows === 0) {
          resolve({ status: 404, message: "Course not found" });
          return;
        }

        resolve({ status: 200, message: "Updated successfully" });
      }
    );
  });
};

export default {
  create,
  updateById,
  deleteById,
  getBySessionId,
  getByLectureId,
  createStudentProgress,
  updateStudentProgress,
};
