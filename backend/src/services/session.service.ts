import { generateRandomString } from "../config/randomString";
import { ISession } from "../constant/session";
import db from "../config/connectDB";
import {
  dataListResponse,
  dataResponse,
  updateResponse,
} from "../constant/type";
import { ResultSetHeader } from "mysql2";

const create = async (data: ISession): Promise<dataResponse<ISession>> => {
  data.session_id = generateRandomString();
  data.createdAt = new Date();
  data.updatedAt = new Date();
  const sql = `INSERT INTO session SET ?`;
  return new Promise<dataResponse<ISession>>((resolve, rejects) => {
    db.connectionDB.query(sql, data, (err, result) => {
      if (err) {
        rejects(err);
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

const getSessionByCourseId = async (
  id: string
): Promise<dataListResponse<ISession>> => {
  const sql = "Select * from session where course_id = ? ";
  return new Promise<dataListResponse<ISession>>((resolve, reject) => {
    db.connectionDB.query(sql, [id], (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve({ status: 200, data: result as ISession[], message: "Success" });
    });
  });
};

const updateById = async (
  id: string,
  data: ISession
): Promise<updateResponse> => {
  const sql = `UPDATE session SET ? WHERE session_id = ?`;
  return new Promise<updateResponse>((resolve, reject) => {
    db.connectionDB.query(sql, [data, id], (err, result: ResultSetHeader) => {
      if (err) {
        reject(err);
        return;
      }
      if (result.affectedRows === 0) {
        resolve({ status: 404, message: "Not Found" });
        return;
      }
      resolve({ status: 200, message: "Success" });
    });
  });
};
const deleteById = async (id: string): Promise<updateResponse> => {
  const sql = `
    DELETE FROM session WHERE session_id = ?;
  `;
  return new Promise<updateResponse>((resolve, reject) => {
    db.connectionDB.query(sql, [id, id], (err, result: ResultSetHeader) => {
      if (err) {
        reject(err);
        return;
      }
      if (result.affectedRows === 0) {
        resolve({ status: 404, message: "Not Found" });
        return;
      }
      resolve({ status: 200, message: "Deleted Successfully" });
    });
  });
};
export default {
  create,
  getSessionByCourseId,
  updateById,
  deleteById,
};
