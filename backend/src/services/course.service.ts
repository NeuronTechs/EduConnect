import { ResultSetHeader, RowDataPacket } from "mysql2";
import db from "../config/connectDB";
import { generateRandomString } from "../config/randomString";
import { ICourse, ICourseDetail } from "../constant/course";
import {
  dataListResponse,
  dataResponse,
  updateResponse,
} from "../constant/type";
import { log } from "util";
import { ISession } from "../constant/session";

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

// get course details with session and lecture of session
// Define a function that retrieves course details for a given course ID
const getCourseDetails = async (
  course_id: string
): Promise<dataResponse<ICourseDetail>> => {
  // Define the SQL query to retrieve course details
  const sql = `SELECT c.course_id ,c.title as course_name,c.description as course_description,s.session_id, s.name AS session_name, l.lecture_id, l.name AS lecture_name, l.description, l.source, l.type, l.duration
  FROM Session s
  JOIN Lecture l ON s.session_id = l.session_id
  JOIN Course c ON s.course_id = c.course_id
  WHERE s.course_id = ?
  ORDER BY s.session_id, l.lecture_id; `;

  // Execute the SQL query and return a Promise that resolves to the course details
  return new Promise<dataResponse<ICourseDetail>>((resolve, reject) => {
    db.connectionDB.query(sql, [course_id], (err, result: RowDataPacket[]) => {
      if (err) {
        reject(err);
        return;
      }

      // Parse the query result and create an ICourseDetail object
      const resultData: ICourseDetail = {
        course_id: result[0].course_id,
        title: result[0].course_name,
        description: result[0].course_description,
        sessions: [],
      };

      // Iterate over the query result and group lectures by session
      let sample = {
        session_id: result[0].session_id,
        session_name: result[0].session_name,
      };
      let lectures: any[] = [];
      for (const item of result) {
        if (sample.session_id === item.session_id) {
          lectures.push({ ...item });
        } else {
          const { session_id, session_name } = sample;
          const temp: ISession = {
            session_id,
            name: session_name,
            course_id: resultData.course_id,
            lectures,
          };
          resultData.sessions.push(temp);
          lectures = [];
          sample.session_id = item.session_id;
          sample.session_name = item.session_name;
          lectures.push({
            lecture_id: item.lecture_id,
            lecture_name: item.lecture_name,
            description: item.description,
            source: item.source,
            type: item.type,
          });
        }
      }

      // Add the last session to the ICourseDetail object
      const { session_id, session_name } = sample;
      const temp: ISession = {
        session_id,
        name: session_name,
        course_id: resultData.course_id,
        lectures,
      };
      resultData.sessions.push(temp);

      // Return the course details as a dataResponse object
      resolve({
        status: 200,
        data: resultData as ICourseDetail,
        message: "Success",
      });
    });
  });
};

const getOverviewCourse = async (
  course_id: string
): Promise<dataResponse<any>> => {
  const sql = `SELECT c.course_id ,c.title as course_name,c.description as course_description,s.session_id, s.name AS session_name, l.lecture_id, l.name AS lecture_name, l.description, l.source, l.type, l.duration, c.price, c.discount, c.study, c.requirement
  FROM Session s
  JOIN Lecture l ON s.session_id = l.session_id
  JOIN Course c ON s.course_id = c.course_id
  WHERE s.course_id = ?
  ORDER BY s.session_id, l.lecture_id;`;

  return new Promise<dataResponse<any>>((resolve, reject) => {
    db.connectionDB.query(sql, [course_id], (err, result: RowDataPacket[]) => {
      if (err) {
        reject(err);
        return;
      }

      // Return the course details as a dataResponse object
      resolve({
        status: 200,
        data: result,
        message: "Success",
      });
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
  getCourseDetails,
  getOverviewCourse,
};
