import db from "../config/connectDB";
require("dotenv").config();
import {
  User,
  informationDataUpdate,
  informationResponse,
  isValidEmailRequest,
  isValidEmailResponse,
  registerResponse,
  resetPasswordRequest,
  resetPasswordResponse,
} from "../constant/user";
import nodemailer from "nodemailer";
import { convertTimestampToDateTime } from "../constant/utils";
import { RowDataPacket } from "mysql2";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "dinhhieunguyen07@gmail.com",
    pass: "vpqndesrvqdkrqws",
  },
});

const login = (username: string): Promise<any> => {
  try {
    const query =
      "SELECT user.*, COALESCE(student.student_id, teacher.teacher_id) as user_id FROM user LEFT JOIN student ON user.username = student.username AND user.role = 0 LEFT JOIN teacher ON user.username = teacher.username AND user.role = 1 WHERE user.username = ? ";
    return new Promise((resolve, reject) => {
      db.connectionDB.query(query, [username], function (err, results) {
        if (err) {
          reject(err);
          return;
        } else {
          resolve(results);
        }
      });
    });
  } catch (error) {
    throw error;
  }
};

const getUserName = async (username: string, email: string): Promise<any> => {
  try {
    const newUser = "SELECT * FROM user where username = ? or email = ?";
    return new Promise((resolve, reject) => {
      db.connectionDB.query(
        newUser,
        [username, email],
        (error, users, fields) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(users);
        }
      );
    });
  } catch (error) {
    throw error;
  }
};

const register = async (
  username: string,
  password: string,
  fullName: string,
  email: string
): Promise<registerResponse> => {
  try {
    let data: User[];
    data = await getUserName(username, email);
    const nowString = convertTimestampToDateTime();
    const insertNewUser =
      "INSERT INTO `user` (`username`, `password`,`email`,`createdAt`, `updatedAt`, `full_name`) VALUES (?,?,?,?,?,?)";
    return new Promise((resolve, reject) => {
      if (data?.length === 0) {
        db.connectionDB.query(
          insertNewUser,
          [username, password, email, nowString, nowString, fullName],
          (error, results, fields) => {
            if (error) {
              reject(error);
              return;
            }
            let user: User;
            user = {
              username: username,
              role: null,
              fullName: fullName,
              createdAt: nowString,
              updatedAt: nowString,
              avatar: null,
              phone: null,
              email: email,
              password: password,
            };
            resolve({
              status: true,
              data: user,
              message: "Sign up success",
            });
          }
        );
      } else {
        resolve({
          status: false,
          data: null,
          message: "Username or email is existed!",
        });
      }
    });
  } catch (error) {
    throw error;
  }
};

const updateUser = async (
  username: string,
  role: string,
  fullName: string,
  avatar: string,
  phone: string,
  email: string,
  birthday: string,
  address: string
): Promise<informationResponse> => {
  try {
    const newUser =
      "UPDATE `user` SET `full_name` = ?, `role` = ?, `avatar` = ?, `phone` = ?, `email` = ?, `birthday` = ?, `address` = ?, `updatedAt` = ? WHERE (`username` = ?)";
    const timeUpdate = convertTimestampToDateTime();
    return new Promise((resolve, reject) => {
      db.connectionDB.query(
        newUser,
        [
          fullName,
          role,
          avatar,
          phone,
          email,
          birthday,
          address,
          timeUpdate,
          username,
        ],
        (error, users, fields) => {
          if (error) {
            reject({
              status: false,
              message: error,
            });
            return;
          }
          resolve({
            status: true,
            message: "Update information user success",
          });
        }
      );
    });
  } catch (error) {
    throw error;
  }
};

const updateInformation = async (
  data: informationDataUpdate
): Promise<informationResponse> => {
  try {
    if (data?.role === "0") {
      const update: informationResponse = await updateUser(
        data?.username,
        data?.role,
        data?.fullName,
        data?.avatar,
        data?.phone,
        data?.email,
        data?.birthday,
        data?.address
      );
      if (update.status) {
        const student_id = "st_" + data?.username;
        const newQuery =
          "INSERT INTO `student` (`student_id`,`username`, `educational_level`, `major`, `course`, `school`, `address_school`) VALUES (?,?,?,?,?,?,?);";
        return new Promise((resolve, reject) => {
          db.connectionDB.query(
            newQuery,
            [
              student_id,
              data?.username,
              data?.educational_level,
              data?.major,
              data?.course,
              data?.school,
              data?.address_school,
            ],
            (error, users, fields) => {
              if (error) {
                reject({
                  status: false,
                  message: error,
                });
                return;
              }
              resolve({
                status: true,
                message: "Update information success",
              });
            }
          );
        });
      } else {
        return update;
      }
    } else {
      const update: informationResponse = await updateUser(
        data?.username,
        data?.role,
        data?.fullName,
        data?.avatar,
        data?.phone,
        data?.email,
        data?.birthday,
        data?.address
      );
      if (update.status) {
        const teacher_id = "te_" + data?.username;
        const newQuery =
          "INSERT INTO `teacher` (`teacher_id`,`username`, `educational_level`, `major`, `course`, `school`, `address_school`) VALUES (?,?,?,?,?,?,?);";
        return new Promise((resolve, reject) => {
          db.connectionDB.query(
            newQuery,
            [
              teacher_id,
              data?.username,
              data?.educational_level,
              data?.major,
              data?.course,
              data?.school,
              data?.address_school,
            ],
            (error, users, fields) => {
              if (error) {
                reject({
                  status: false,
                  message: error,
                });
                return;
              }
              resolve({
                status: true,
                message: "Update information success",
              });
            }
          );
        });
      } else {
        return update;
      }
    }
  } catch (error) {
    throw error;
  }
};

const checkExistUser = async (email: string): Promise<any> => {
  try {
    const query = "SELECT * FROM user WHERE email = ?";
    return new Promise((resolve, reject) => {
      db.connectionDB.query(query, [email], (error, users, fields) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(users);
      });
    });
  } catch (error) {
    throw error;
  }
};

const isValidEmail = async (
  data: isValidEmailRequest
): Promise<isValidEmailResponse> => {
  try {
    const { email, token } = data;
    const user = await checkExistUser(email);
    if (user?.length === 0) {
      return {
        status: false,
        message: "User not exist!",
      };
    } else {
      const expirationTimestamp = convertTimestampToDateTime();
      const query =
        "INSERT INTO password_reset_tokens (email, token, expires_at) VALUES (?, ?, ?)";
      return new Promise((resolve, reject) => {
        db.connectionDB.query(
          query,
          [email, token, expirationTimestamp],
          (error, result, fields) => {
            if (error) {
              reject({
                status: false,
                message: error,
              });
              return;
            } else {
              const resetLink: string = `${process.env.BASE_URL}/reset-password`;
              // Send reset email
              transporter.sendMail(
                {
                  to: email,
                  subject: "Mã khôi phục tài khoản của bạn",
                  html: `<div>
                  <h1>Xin chào</h1>
                  <p>Chúng tôi đã nhận được yêu cầu đặt lại mật khẩu của bạn.
                  Nhập mã đặt lại mật khẩu sau đây:</p>
                  <p style="border:1px solid blue; border-radius:5px; padding:5px; width:75%; textAlign:center; fontSize:20px;">${token}</p>
                  <p>Hãy truy cập vào link sau để thay đổi trực tiếp mật khẩu của bạn.</p>
                  <p>Click <a href="${resetLink}">Đổi mật khẩu</a> để thay đổi mật khẩu.</p>
                </div>`,
                },
                (emailErr) => {
                  if (emailErr) {
                    reject({
                      status: false,
                      message: emailErr,
                    });
                  }
                  resolve({
                    status: true,
                    message: "Password reset email sent.",
                  });
                }
              );
            }
          }
        );
      });
    }
  } catch (error) {
    throw error;
  }
};

const resetPassword = async (
  data: resetPasswordRequest
): Promise<resetPasswordResponse> => {
  try {
    const { token, newPassword } = data;
    const query: string =
      "SELECT * FROM password_reset_tokens WHERE token = ? AND expires_at < NOW()";
    return new Promise((resolve, reject) => {
      db.connectionDB.query(query, [token], (error, results) => {
        if (error) {
          reject({
            status: false,
            message: error,
          });
          return;
        } else {
          if (Array.isArray(results) && results.length === 0) {
            reject({
              status: false,
              message: "Invalid or expired token.",
            });
            return;
          } else if (Array.isArray(results) && results.length !== 0) {
            const updatedAt = convertTimestampToDateTime();
            const updateQuery: string =
              "UPDATE user SET password = ?, updatedAt = ? WHERE email = ?";
            const email = results.map((item: any) => {
              return {
                email: item.email,
              };
            });
            db.connectionDB.query(
              updateQuery,
              [newPassword, updatedAt, email[0].email],
              (error, results, fields) => {
                if (error) {
                  reject({
                    status: false,
                    message: error,
                  });
                  return;
                } else {
                  const deleteQuery: string =
                    "DELETE FROM password_reset_tokens WHERE token = ?";
                  db.connectionDB.query(
                    deleteQuery,
                    [token],
                    (error, results, fields) => {
                      if (error) {
                        reject({
                          status: false,
                          message: error,
                        });
                        return;
                      } else {
                        resolve({
                          status: true,
                          message: "Reset password success",
                        });
                      }
                    }
                  );
                }
              }
            );
          }
        }
      });
    });
  } catch (error) {
    throw error;
  }
};

const getInforTeacher = (teacher_id: string): Promise<any> => {
  try {
    const query =
      "SELECT * FROM educonnectdb.teacher join educonnectdb.user on teacher.username = user.username WHERE teacher_id = ?";
    return new Promise((resolve, reject) => {
      db.connectionDB.query(query, [teacher_id], function (err, results) {
        if (err) {
          reject(err);
          return;
        } else {
          resolve({
            status: 200,
            data: results,
            message: "Get infor teacher success",
          });
        }
      });
    });
  } catch (error) {
    throw error;
  }
};

const changePassword = async (
  username: string,
  password: string
): Promise<any> => {
  try {
    const nowString = convertTimestampToDateTime();
    const insertNewUser =
      "UPDATE user SET password = ?, updatedAt = ? WHERE username = ?";
    return new Promise((resolve, reject) => {
      db.connectionDB.query(
        insertNewUser,
        [password, nowString, username],
        (error, results, fields) => {
          if (error) {
            console.log(error);
            reject(error);
            return;
          }
          resolve({
            status: true,
            message: "change password success",
          });
        }
      );
    });
  } catch (error) {
    throw error;
  }
};

const getProcessCourseByStudentId = async (
  student_id: string
): Promise<any> => {
  try {
    const sql = `SELECT 
      subquery.course_id,
      c.title, 
      IF (subquery.completed_lectures = subquery.total_lectures, "complete", "progress") as isComplete
      FROM 
      (
          SELECT 
              c.course_id,
              COUNT(DISTINCT sp.lecture_id) as completed_lectures,
              (SELECT COUNT(*) FROM lecture l JOIN session ss ON l.session_id = ss.session_id WHERE ss.course_id = c.course_id) as total_lectures
          FROM 
              course c
          LEFT JOIN 
              student_progress sp ON c.course_id = sp.course_id AND sp.student_id = ?
          WHERE 
              c.course_id IN (SELECT course_id FROM order_items WHERE student_id = ?)
          GROUP BY 
              c.course_id
      ) as subquery
      JOIN 
      course c ON c.course_id = subquery.course_id;`;
    return new Promise((resolve, reject) => {
      db.connectionDB.query(
        sql,
        [student_id, student_id],
        (error, results: RowDataPacket[], fields) => {
          if (error) {
            console.log(error);
            reject(error);
            return;
          }
          resolve({
            status: true,
            data: results,
            message: "Get process success",
          });
        }
      );
    });
  } catch (error) {
    throw error;
  }
};

export default {
  login,
  register,
  updateInformation,
  isValidEmail,
  resetPassword,
  getInforTeacher,
  changePassword,
  getProcessCourseByStudentId
};
