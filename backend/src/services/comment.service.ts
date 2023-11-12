import { RowDataPacket } from "mysql2";
import db from "../config/connectDB";
import { generateRandomString } from "../config/randomString";

import { IComment } from "../constant/comment";
import {
  dataListResponse,
  dataResponse,
  updateResponse,
} from "../constant/type";

const create = async (data: IComment): Promise<dataResponse<IComment>> => {
  data.comment_id = generateRandomString();
  data.createdAt = Date.now();
  const sql = `INSERT INTO comments SET ?`;
  return new Promise<dataResponse<IComment>>((resolve, reject) => {
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

const getById = async (id: string): Promise<dataResponse<IComment>> => {
  const sql = `SELECT * FROM comments WHERE comment_id = ?`;
  return new Promise<dataResponse<IComment>>((resolve, reject) => {
    db.connectionDB.query(sql, [id], (err, result: RowDataPacket[]) => {
      if (err) {
        reject(err);
        return;
      }
      resolve({
        status: 200,
        data: result[0] as IComment,
        message: "Success",
      });
    });
  });
};

const update = async (id: string, data: IComment): Promise<updateResponse> => {
  const sql = `UPDATE comments SET ? WHERE comment_id = ?`;
  return new Promise<updateResponse>((resolve, reject) => {
    db.connectionDB.query(sql, [data, id], (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve({
        status: 200,
        message: "Updated successfully",
      });
    });
  });
};

const remove = async (id: string): Promise<updateResponse> => {
  const sql = `DELETE FROM comments WHERE comment_id = ?`;
  return new Promise<updateResponse>((resolve, reject) => {
    db.connectionDB.query(sql, [id], (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve({
        status: 200,
        message: "Deleted successfully",
      });
    });
  });
};

const getByLectureId = async (
  id: string,
  page: number,
  pageSize: number
): Promise<dataListResponse<IComment>> => {
  const offset = (page - 1) * pageSize;
  const sql = `SELECT comment_id,c.username,lecture_id,timestamp,content,c.createdAt,avatar FROM comments c join user u on c.username=u.username WHERE lecture_id = ? order by createdAt LIMIT ?, ?`;
  return new Promise<dataListResponse<IComment>>((resolve, reject) => {
    db.connectionDB.query(
      sql,
      [id, offset, pageSize],
      (err, result: RowDataPacket[]) => {
        if (err) {
          reject(err);
          return;
        }
        resolve({
          status: 200,
          data: result as IComment[],
          message: "Success",
        });
      }
    );
  });
};

export default {
  create,
  getById,
  update,
  remove,
  getByLectureId,
};
