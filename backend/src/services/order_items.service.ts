import { ResultSetHeader, RowDataPacket } from "mysql2";
import db from "../config/connectDB";
import { generateRandomString } from "../config/randomString";
import { IOderItem } from "../constant/order_items";
import { dataListResponse, dataResponse } from "../constant/type";

const create = async (data: IOderItem): Promise<dataResponse<IOderItem>> => {
  data.order_items_id = generateRandomString();
  const sql = `INSERT INTO order_items SET ?`;
  return new Promise<dataResponse<IOderItem>>((resolve, reject) => {
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
  data: IOderItem
): Promise<dataResponse<IOderItem>> => {
  const sql = `UPDATE order_items SET ? WHERE order_items_id = ?`;
  return new Promise<dataResponse<IOderItem>>((resolve, reject) => {
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

const deleteById = async (id: string): Promise<dataResponse<IOderItem>> => {
  const sql = `DELETE FROM order_items WHERE order_items_id = ?`;
  return new Promise<dataResponse<IOderItem>>((resolve, reject) => {
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

const getByStudentId = async (
  id: string
): Promise<dataListResponse<IOderItem>> => {
  const sql = `SELECT * FROM order_items WHERE student_id = ?`;
  return new Promise<dataListResponse<IOderItem>>((resolve, reject) => {
    db.connectionDB.query(sql, [id], (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve({ status: 200, data: result as IOderItem[], message: "Success" });
    });
  });
};

const getByCourseId = async (
  id: string
): Promise<dataListResponse<IOderItem>> => {
  const sql = `SELECT * FROM order_items WHERE course_id = ?`;
  return new Promise<dataListResponse<IOderItem>>((resolve, reject) => {
    db.connectionDB.query(sql, [id], (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve({ status: 200, data: result as IOderItem[], message: "Success" });
    });
  });
};

const getByOrderItemId = async (
  id: string
): Promise<dataResponse<IOderItem>> => {
  const sql = `SELECT * FROM order_items WHERE order_items_id = ?`;
  return new Promise<dataResponse<IOderItem>>((resolve, reject) => {
    db.connectionDB.query(sql, [id], (err, result: RowDataPacket[]) => {
      if (err) {
        reject(err);
        return;
      }
      if (result.length === 0) {
        resolve({ status: 404, message: "Not Found" });
        return;
      }
      resolve({
        status: 200,
        data: result[0] as IOderItem,
        message: "Success",
      });
    });
  });
};

export default {
  create,
  updateById,
  deleteById,
  getByStudentId,
  getByCourseId,
  getByOrderItemId,
};
