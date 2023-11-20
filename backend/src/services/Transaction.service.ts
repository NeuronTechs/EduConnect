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

export default {
  getTransactionReport,
};
