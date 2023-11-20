import { RowDataPacket } from "mysql2";
import db from "../config/connectDB";
import { generateRandomString } from "../config/randomString";

import { IComment } from "../constant/comment";
import {
  dataListResponse,
  dataResponse,
  updateResponse,
} from "../constant/type";
import { v4 as uuidv4 } from "uuid";
import { Multer } from "multer";

const create = async (
  data: IComment,
  files:
    | {
        [fieldname: string]: Express.Multer.File[];
      }
    | Express.Multer.File[]
    | undefined
): Promise<dataResponse<IComment>> => {
  try {
    data.comment_id = uuidv4();
    data.createdAt = Date.now();

    let fileData: string | null = null;
    if (files) {
      fileData = JSON.stringify(
        Object.values(files).map((file) => {
          console.log(file);

          return {
            originalname: file.originalname,
            mimetype: file.mimetype,
            path: file.path,
            size: file.size,
          };
        })
      );
    }
    data.resource = fileData;
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
  } catch (error) {
    console.log(error);

    throw error;
  }
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
  const sql = `
SELECT 
  c.comment_id,
  c.username,
  c.lecture_id,
  c.timestamp,
  c.content,
  c.resource,
  c.isReply,
  c.createdAt,
  u.avatar,
  (SELECT COUNT(*) FROM comments r WHERE r.reply_id = c.comment_id) as reply_count
FROM 
  comments c 
JOIN 
  user u 
ON 
  c.username=u.username 
WHERE 
  c.lecture_id = ? 
  AND c.isReply="false" 
ORDER BY 
  c.createdAt 
LIMIT ?, ?`;
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

const getReplyByCommentId = async (
  id: string,
  page: number,
  pageSize: number
): Promise<dataListResponse<IComment>> => {
  const offset = (page - 1) * pageSize;
  const sql = `
SELECT 
  c.username,
  c.lecture_id,
  c.timestamp,
  c.content,
  c.isReply,
  c.resource,
  c.createdAt,
  u.avatar
FROM 
  comments c 
JOIN 
  user u 
ON 
  c.username=u.username 
WHERE 
  c.reply_id = ? 
ORDER BY 
  c.createdAt 
LIMIT ?, ?`;
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
  getReplyByCommentId,
};
