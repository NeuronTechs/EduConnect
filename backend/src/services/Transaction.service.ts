import { RowDataPacket } from "mysql2";
import db from "../config/connectDB";
import {
  dataListResponse,
  dataResponse,
  updateResponse,
} from "../constant/type";

import { v4 as uuidv4 } from "uuid";
import { ITransaction, ITransactionReport } from "../constant/transaction";

const getTransactionReport = async (): Promise<
  dataListResponse<ITransactionReport>
> => {
  try {
    const sql = `
    
SELECT 
YEAR(createdAt) as year, 
MONTH(createdAt) as month, 
SUM(amount) as revenue,
COUNT(DISTINCT student_id) as total_student
FROM 
transactions
WHERE 
createdAt >= DATE_SUB(CURDATE(), INTERVAL 9 MONTH)
AND status = 'Thành Công'
GROUP BY 
year, 
month
ORDER BY 
year DESC, 
month DESC;`;
    return new Promise<dataListResponse<ITransactionReport>>(
      (resolve, reject) => {
        db.connectionDB.query(sql, (err, result: RowDataPacket[]) => {
          if (err) {
            reject(err);
            return;
          }
          const data = result.map((row: RowDataPacket) => {
            return {
              year: row.year,
              month: row.month,
              revenue: row.revenue,
              total_student: row.total_student,
            };
          });
          resolve({
            status: 200,
            data,
            message: "Get transaction report successfully",
          });
        });
      }
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getTransactionByStudent = async (username: string): Promise<any> => {
  try {
    const query = `SELECT	student.student_id, transactions.transaction_id, course.course_id, course.title, transactions.amount, transactions.status, transactions.createdAt
      FROM educonnectdb.student join educonnectdb.user on student.username = user.username
      join educonnectdb.transactions on student.student_id = transactions.student_id
      join educonnectdb.course on transactions.course_id = course.course_id where user.username = ?`;
    return new Promise((resolve, reject) => {
      db.connectionDB.query(
        query,
        [username],
        (error, transactions: RowDataPacket[], fields) => {
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
            data: transactions,
            message: "Get transactions success",
          });
        }
      );
    });
  } catch (error) {
    throw error;
  }
};

const getTransactionByTeacher = async (teacher_id: string): Promise<any> => {
  try {
    const query = `SELECT	student.student_id, transactions.transaction_id, course.course_id, course.title, transactions.amount, transactions.status, transactions.createdAt, user.full_name
    FROM educonnectdb.student join educonnectdb.user on student.username = user.username
    join educonnectdb.transactions on student.student_id = transactions.student_id
    join educonnectdb.course on transactions.course_id = course.course_id where course.teacher_id = ?`;
    return new Promise((resolve, reject) => {
      db.connectionDB.query(
        query,
        [teacher_id],
        (error, transactions: RowDataPacket[], fields) => {
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
            data: transactions,
            message: "Get transactions success",
          });
        }
      );
    });
  } catch (error) {
    throw error;
  }
};

export default {
  getTransactionReport,
  getTransactionByStudent,
  getTransactionByTeacher,
};
