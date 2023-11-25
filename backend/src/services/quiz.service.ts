import connectDB from "../config/connectDB";
import { v4 as uuidv4 } from "uuid";
import { dataListResponse, dataResponse } from "../constant/type";
import { QueryError, ResultSetHeader, RowDataPacket } from "mysql2";
interface IQuiz {
  resource_id: string;
  lecture_id: string;
  timeout?: string;
  description: string;
  duration: number;
  durationUnit: string;
  isRandom: boolean;
  isShowAnswer: boolean;
  type: string;
  passPercent: number;
  retakePercent: number;
  content: string;
  quiz_id: string;
  questions?: [];
  created_at?: string;
  updated_at?: string;
}
interface IQuestion {
  question_id: string;
  quiz_id: string;
  lecture_id: string;
  image: string;
  question: string;
  type: string;
  answers?: IAnswer[];
  created_at?: string;
  updated_at?: string;
}
export interface IAnswer {
  answer_id: string;
  question_id: string;
  image: string;
  question: string;
  isCorrect: boolean;
  explain: string;
  created_at?: string;
  updated_at?: string;
}
// quiz
const createQuiz = async (quiz: IQuiz) => {
  quiz.resource_id = uuidv4();

  const query = `INSERT INTO lecture_quiz SET ?`;
  return new Promise<dataResponse<IQuiz>>((resolve, rejects) => {
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
            data: quiz as IQuiz,
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
const getQuiz = async (lecture_id: string) => {
  const query = `SELECT * FROM lecture_quiz WHERE lecture_id = ?;
   SELECT * FROM quiz_question WHERE lecture_id = ?; 
   SELECT quiz_answer.* FROM quiz_question LEFT JOIN quiz_answer ON quiz_question.question_id = quiz_answer.question_id WHERE lecture_id = ?`;
  return new Promise<dataResponse<IQuiz>>((resolve, rejects) => {
    try {
      connectDB.connectionDB.query(
        { sql: query, values: [lecture_id, lecture_id, lecture_id] },
        (
          err: QueryError,
          result: { [0]: IQuiz[]; [1]: IQuestion[]; [2]: IAnswer[] }
        ) => {
          if (err) {
            rejects({
              status: 400,
              data: [],
              message: err.message,
            });
            return;
          }
          const data = {
            ...result[0][0],
            questions: result[1].map((question) => {
              return {
                ...question,
                answers: result[2].filter(
                  (answer) => answer.question_id === question.question_id
                ),
              };
            }),
          };
          resolve({
            status: 200,
            data: data as IQuiz,
            message: "Get quiz successfully",
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
const updateQuiz = async (lecture_id: string, section: IQuiz) => {
  section.timeout = section.timeout
    ? section.timeout.slice(0, 19).replace("T", " ")
    : "00:00:00";
  const query = `UPDATE lecture_quiz SET ? 
  WHERE lecture_id = ? `;
  return new Promise<dataResponse<IQuiz>>((resolve, rejects) => {
    try {
      connectDB.connectionDB.query(
        { sql: query, values: [section, lecture_id] },
        (err: QueryError, result: IQuiz) => {
          console.log(err);

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
            data: section as IQuiz,
            message: "Updated successfully",
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
// question
const createQuestionQuiz = async (question: IQuestion) => {
  question.question_id = uuidv4();
  const query = `INSERT INTO quiz_question SET ?`;
  return new Promise<dataResponse<IQuestion>>((resolve, rejects) => {
    try {
      connectDB.connectionDB.query(
        { sql: query, values: [question] },
        (err: QueryError) => {
          console.log(err);
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
            data: question as IQuestion,
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

const getQuestionQuiz = async (question_id: string) => {
  const query = `SELECT * FROM lecture_question WHERE question_id = ?`;
  return new Promise<dataResponse<IQuiz>>((resolve, rejects) => {
    try {
      connectDB.connectionDB.query(
        { sql: query, values: [question_id] },
        (err: QueryError, result: IQuiz) => {
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
            data: result as IQuiz,
            message: "Get quiz successfully",
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

const updateQuestionQuiz = async (question: IQuestion) => {
  const query = `UPDATE quiz_question SET ? WHERE question_id = ?`;
  return new Promise<dataResponse<IQuestion>>((resolve, rejects) => {
    try {
      connectDB.connectionDB.query(
        { sql: query, values: [question, question.question_id] },
        (err: QueryError, result: ResultSetHeader) => {
          if (err) {
            rejects({
              status: 400,
              data: [],
              message: err.message,
            });
            return;
          }
          if (result.affectedRows === 0) {
            rejects({
              status: 400,
              data: [],
              message: "Question not found",
            });
            return;
          } else {
            resolve({
              status: 200,
              data: question as IQuestion,
              message: "Updated successfully",
            });
          }
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

const deleteQuestionQuiz = async (question_id: string) => {
  const query = `DELETE FROM quiz_question WHERE question_id = ?`;
  return new Promise<dataResponse<IQuestion>>((resolve, rejects) => {
    try {
      connectDB.connectionDB.query(
        { sql: query, values: [question_id] },
        (err: QueryError, result: ResultSetHeader) => {
          if (err) {
            rejects({
              status: 400,
              data: [],
              message: err.message,
            });
            return;
          }
          if (result.affectedRows === 0) {
            rejects({
              status: 400,
              data: [],
              message: "Question not found",
            });
            return;
          } else {
            resolve({
              status: 200,
              data: {} as IQuestion,
              message: "Deleted successfully",
            });
          }
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
// answer
const createAnswerQuestion = async (answer: IAnswer) => {
  answer.answer_id = uuidv4();
  answer.isCorrect = answer.isCorrect ? answer.isCorrect : false;
  const query = `INSERT INTO quiz_answer SET ?`;
  return new Promise<dataResponse<IAnswer>>((resolve, rejects) => {
    try {
      connectDB.connectionDB.query(
        { sql: query, values: [answer] },
        (err: QueryError, result: IAnswer) => {
          console.log(err);
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
            data: answer as IAnswer,
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
const updateAnswerQuestion = async (data: IAnswer) => {
  const query = `UPDATE quiz_answer SET ? WHERE answer_id = ?`;

  return new Promise<dataResponse<IAnswer>>((resolve, rejects) => {
    try {
      connectDB.connectionDB.query(
        { sql: query, values: [data, data.answer_id] },
        (err: QueryError, result: ResultSetHeader) => {
          if (err) {
            rejects({
              status: 400,
              data: [],
              message: err.message,
            });
            return;
          }
          if (result.affectedRows === 0) {
            rejects({
              status: 400,
              data: [],
              message: "Answer not found",
            });
            return;
          } else {
            resolve({
              status: 200,
              data: data as IAnswer,
              message: "Updated successfully",
            });
          }
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
const deleteAnswerQuestion = async (answer_id: string) => {
  const query = `DELETE FROM quiz_answer WHERE answer_id = ?`;
  return new Promise<dataResponse<IAnswer>>((resolve, rejects) => {
    try {
      connectDB.connectionDB.query(
        { sql: query, values: [answer_id] },
        (err: QueryError, result: ResultSetHeader) => {
          if (err) {
            rejects({
              status: 400,
              data: [],
              message: err.message,
            });
            return;
          }
          if (result.affectedRows === 0) {
            rejects({
              status: 400,
              data: [],
              message: "Answer not found",
            });
            return;
          } else {
            resolve({
              status: 200,
              data: {} as IAnswer,
              message: "Deleted successfully",
            });
          }
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
const getAnswerQuestion = async (questionId: IAnswer) => {
  const query = `SELECT * FROM quiz_answer WHERE quiz_id = ?`;
  return new Promise<dataResponse<IAnswer>>((resolve, rejects) => {
    try {
      connectDB.connectionDB.query(
        { sql: query, values: [questionId] },
        (err: QueryError, result: IAnswer) => {
          if (err) {
            rejects({
              status: 400,
              data: [],
              message: err.message,
            });
          }
          resolve({
            status: 200,
            data: result as IAnswer,
            message: "Get quiz successfully",
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

/// Sang ///////////////////////////////////

export default {
  createQuiz,
  getQuiz,
  updateQuiz,

  createQuestionQuiz,
  getQuestionQuiz,
  updateQuestionQuiz,
  deleteQuestionQuiz,

  createAnswerQuestion,
  updateAnswerQuestion,
  deleteAnswerQuestion,
  getAnswerQuestion,

  //query sang
};
