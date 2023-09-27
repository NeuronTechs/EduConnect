import db from "../config/connectDB";
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

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "dinhhieunguyen07@gmail.com",
    pass: "vpqndesrvqdkrqws",
  },
});

const login = (username: string): Promise<any> => {
  try {
    const query = "SELECT * FROM user WHERE username = ?";
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
    if (data?.role === "teacher") {
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
          "INSERT INTO `teacher` (`student_id`,`username`, `educational_level`, `major`, `course`, `school`, `address_school`) VALUES (?,?,?,?,?,?,?);";
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
          "INSERT INTO `student` (`teacher_id`,`username`, `educational_level`, `major`, `course`, `school`, `address_school`) VALUES (?,?,?,?,?,?,?);";
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
              const resetLink: string = `https://yourwebsite.com/reset-password?token=${token}`;
              // Send reset email
              transporter.sendMail(
                {
                  to: email,
                  subject: "Password Reset Request",
                  html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
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

export default {
  login,
  register,
  updateInformation,
  isValidEmail,
  resetPassword,
};
