import { QueryError } from "mysql2";
import connectDB from "../config/connectDB";
import { dataListResponse, dataResponse } from "../constant/type";
import { IAnswer } from "./quiz.service";
export interface answer {
  type: string;
  index: number;
  answer: IAnswer[];
}
interface IQuizResult {
  student_id: string;
  quiz_id: string;
  answer: string;
  score: string;
  createdAt: string;
}

const createQuiz = async (quiz: IQuizResult) => {
  const data = quiz.answer;
  const json = JSON.stringify(data);
  quiz.answer = json;
  const query = `INSERT INTO quiz_result SET ?`;
  return new Promise<dataResponse<IQuizResult>>((resolve, rejects) => {
    try {
      connectDB.connectionDB.query(
        { sql: query, values: [quiz] },
        (err: QueryError) => {
          if (err) {
            rejects({
              status: 400,
              data: [],
              message: err.message,
            });
            return;
          }
          resolve({
            status: 200,
            data: quiz as IQuizResult,
            message: "Created successfully",
          });
        }
      );
    } catch (err) {
      rejects({
        status: 500,
        data: [],
        message: err,
      });
    }
  });
};

const getResult = async (student_id: string, quiz_id: string) => {
  console.log(student_id, quiz_id);

  const query = `SELECT * FROM quiz_result WHERE student_id = ? AND quiz_id = ?`;
  return new Promise<dataResponse<IQuizResult>>((resolve, rejects) => {
    try {
      connectDB.connectionDB.query(
        { sql: query, values: [student_id, quiz_id] },
        (err: QueryError, result: IQuizResult[]) => {
          if (err) {
            rejects({
              status: 400,
              data: [],
              message: err.message,
            });
            return;
          }

          resolve({
            status: 200,
            data: result[0],
            message: "Get successfully",
          });
        }
      );
    } catch (err) {
      rejects({
        status: 500,
        data: [],
        message: err,
      });
    }
  });
};

export default {
  createQuiz,
  getResult,
};
