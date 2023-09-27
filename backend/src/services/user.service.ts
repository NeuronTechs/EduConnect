import db from "../config/connectDB";
import { User, registerResponse } from "../constant/user";

const login = async (username: string): Promise<User[]> => {
  try {
    const query = "SELECT * FROM user WHERE username = ?";
    return new Promise((resolve, reject) => {
      db.connectionDB.query(query, [username], (error, results, fields) => {
        if (error) {
          reject(error);
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

const getUserName = async (
  username: string,
  email: string
): Promise<User[]> => {
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
    const now = new Date();
    const nowString = now.toISOString().slice(0, 19).replace("T", " ");
    const insertNewUser =
      "INSERT INTO `user` (`username`, `password`,`email`,`createdAt`, `updatedAt`, `fullName`) VALUES (?,?,?,?,?,?)";
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
              userId: results?.insertId,
              username: username,
              role: null,
              fullName: fullName,
              createdAt: nowString,
              updatedAt: nowString,
              avatar: null,
              phone: null,
              email: email,
              password: password
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

const updateInformation = async () => {
  console.log("update");
};

export default {
  login,
  register,
  updateInformation,
};
