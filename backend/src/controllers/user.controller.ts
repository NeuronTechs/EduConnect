import jwt from "jsonwebtoken";
import UserService from "../services/user.service";
import { Request, Response } from "express";
import { User, informationResponse, registerResponse } from "../constant/user";
import bcrypt from "bcrypt";
import crypto from "crypto";

let refreshTokens: string[] = [];
const generateAccessToken = (
  username: string | undefined,
  role: string | null | undefined
): string => {
  return jwt.sign(
    {
      userId: username,
      role: role,
    },
    "educonnect",
    { expiresIn: "1d" }
  );
};
const generatefreshToken = (
  username: string | undefined,
  role: string | null | undefined
): string => {
  return jwt.sign(
    {
      userId: username,
      role: role,
    },
    "educonnect",
    { expiresIn: "7d" }
  );
};

const isValidPassword = async (signInPassword: string, password: string) => {
  try {
    return await bcrypt.compare(signInPassword, password);
  } catch (error: any) {
    throw new Error(error);
  }
};

const register = async (req: Request, res: Response) => {
  try {
    if (
      !req.body?.username ||
      !req.body?.password ||
      !req.body?.email ||
      !req.body?.full_name
    ) {
      res.status(400).json({
        status: 400,
        data: {},
        message: "username, password, email and fullName is require!",
      });
    } else {
      const { username, password, full_name, email } = req.body;
      let result: registerResponse;
      const salt = await bcrypt.genSalt(10);
      const passwordHashed = await bcrypt.hash(password, salt);
      result = await UserService.register(
        username,
        passwordHashed,
        full_name,
        email
      );

      if (result?.status) {
        const accessToken: string = generateAccessToken(
          result?.data?.username,
          result?.data?.role
        );
        const refreshToken: string = generatefreshToken(
          result?.data?.username,
          result?.data?.role
        );
        refreshTokens.push(refreshToken);
        res.setHeader("authorization", "Bearer " + accessToken);
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          path: "/",
          sameSite: "strict",
        });
        if (result?.data) {
          const { password, ...others } = result.data;
          res.status(200).json({
            status: 200,
            data: { ...others, accessToken },
            message: result?.message,
          });
        }
      } else {
        res.status(400).json({
          status: 400,
          data: result?.data,
          message: result?.message,
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      data: {},
      message: error,
    });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    // const { username, password } = req.body;
    // if (req.body?.username && req.body?.password) {
    //   if (username.trim() === "" || password.trim() === "") {
    //     res.status(400).json({
    //       status: 400,
    //       data: {},
    //       message: "field is require!",
    //     });
    //   } else {
    //     let result: User[];
    //     result = await UserService.login(username);
    //     if (result.length > 0) {
    //       if (await isValidPassword(password, result[0]?.password)) {
    //         const accessToken: string = generateAccessToken(
    //           result[0]?.username,
    //           result[0]?.role
    //         );
    //         const refreshToken: string = generatefreshToken(
    //           result[0]?.username,
    //           result[0]?.role
    //         );
    //         refreshTokens.push(refreshToken);
    //         res.setHeader("authorization", "Bearer " + accessToken);
    //         res.cookie("refreshToken", refreshToken, {
    //           httpOnly: true,
    //           secure: false,
    //           path: "/",
    //           sameSite: "strict",
    //         });
    //         const { password, ...others } = result[0];
    //         res.status(200).json({
    //           status: 200,
    //           data: { ...others, accessToken },
    //           message: "get value success",
    //         });
    //       } else {
    //         res.status(400).json({
    //           status: 400,
    //           data: {},
    //           message: "incorrect password",
    //         });
    //       }
    //     } else {
    //       res.status(400).json({
    //         status: 400,
    //         data: {},
    //         message: "incorrect username",
    //       });
    //     }
    //   }
    // } else if (!req.body?.username && req.body?.password) {
    //   res.status(400).json({
    //     status: 400,
    //     data: {},
    //     message: "The username field is require!",
    //   });
    // } else if (req.body?.username && !req.body?.password) {
    //   res.status(400).json({
    //     status: 400,
    //     data: {},
    //     message: "The password field is require!",
    //   });
    // } else {
    //   res.status(400).json({
    //     status: 400,
    //     data: {},
    //     message: "The username and password field is require!",
    //   });
    // }
    // else  {
    //   if (!req.body?.username && req.body?.password) {
    //     res.status(400).json({
    //       status: 400,
    //       data: {},
    //       message: "The username field is require!",
    //     });
    //   }
    //   if (req.body?.username && !req.body?.password) {
    //     res.status(400).json({
    //       status: 400,
    //       data: {},
    //       message: "The password field is require!",
    //     });
    //   }
    //   if (!req.body?.username && !req.body?.password) {
    //     res.status(400).json({
    //       status: 400,
    //       data: {},
    //       message: "The username and password field is require!",
    //     });
    //   }
    // }
    const { username, password } = req.body; //1
    if (!username) {
      //2
      return res.status(400).json({
        //3
        status: 400,
        data: {},
        message: "Hãy nhập tài khoản!",
      });
    } else if (!password) {
      //4
      return res.status(400).json({
        //5
        status: 400,
        data: {},
        message: "Hãy nhập mật khẩu",
      });
    } else {
      const result = await UserService.login(username); //6
      if (result.length === 0) {
        //7
        return res.status(400).json({
          //8
          status: 400,
          data: {},
          message: "Tài khoản không chính xác!",
        });
      }
      const isValid = await isValidPassword(password, result[0]?.password); //9
      if (!isValid) {
        //10
        return res.status(400).json({
          //11
          status: 400,
          data: {},
          message: "Mật khẩu không chính xác",
        });
      }
      const accessToken = generateAccessToken(
        //12
        result[0]?.username,
        result[0]?.role
      );
      const refreshToken = generatefreshToken(
        result[0]?.username,
        result[0]?.role
      );
      refreshTokens.push(refreshToken);
      res.setHeader("authorization", "Bearer " + accessToken);
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      const { password: _, status, ...others } = result[0];
      if (status === "0") {
        res.status(400).json({
          status: 400,
          data: {},
          message: "Tài khoản của bạn đã bị khóa!",
        });
      } else {
        res.status(200).json({
          status: 200,
          data: { ...others, status, accessToken },
          message: "Get value success",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      data: {},
      message: error,
    });
  }
};

const refreshToken = async (req: Request, res: Response) => {
  const cookiesHeader = req.headers.cookie;

  if (cookiesHeader) {
    const index = cookiesHeader.indexOf(";");
    const refreshToken = cookiesHeader
      .substring(0, index)
      .replace("refreshToken=", "");
    if (!refreshTokens.includes(refreshToken)) {
      return res.status(401).json({
        status: 401,
        message: "refresh token is not valid",
      });
    } else {
      jwt.verify(refreshToken, "educonnect", (error: any, user: any) => {
        if (error) {
          console.log(error);
        } else {
          refreshTokens.filter((token) => token !== refreshToken);
          const newAccessToken = generateAccessToken(user?.userId, user?.role);
          const newRefreshToken = generatefreshToken(user?.userId, user?.role);
          refreshTokens.push(newRefreshToken);
          res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            path: "/",
            sameSite: "strict",
          });
          res.status(200).json({ accessToken: newAccessToken });
        }
      });
    }
  } else {
    return res.status(401).json({
      status: 401,
      message: "you're not authenticated",
    });
  }
};

const logout = async (req: Request, res: Response) => {
  res.clearCookie("refreshToken");
  refreshTokens = refreshTokens.filter(
    (token) => token !== req.headers.cookie?.replace("refreshToken=", "")
  );
  res.status(200).json("Log out success");
};

const updateInformation = async (req: Request, res: Response) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        status: 400,
        data: {},
        message: "Request body is missing",
      });
    }

    if (!req.body.username) {
      return res.status(400).json({
        status: 400,
        data: {},
        message: "Username is required",
      });
    }

    if (!req.body.role) {
      return res.status(400).json({
        status: 400,
        data: {},
        message: "Role is required",
      });
    }

    if (!req.body.fullName) {
      return res.status(400).json({
        status: 400,
        data: {},
        message: "Full name is required",
      });
    }

    if (!req.body.avatar && !req.file) {
      return res.status(400).json({
        status: 400,
        data: {},
        message: "Avatar is required",
      });
    }

    if (!req.body.phone) {
      return res.status(400).json({
        status: 400,
        data: {},
        message: "Phone is required",
      });
    }

    if (!req.body.email) {
      return res.status(400).json({
        status: 400,
        data: {},
        message: "Email is required",
      });
    }

    if (!req.body.address) {
      return res.status(400).json({
        status: 400,
        data: {},
        message: "Address is required",
      });
    }

    if (!req.body.birthday) {
      return res.status(400).json({
        status: 400,
        data: {},
        message: "Birthday is required",
      });
    }

    if (!req.body.educational_level) {
      return res.status(400).json({
        status: 400,
        data: {},
        message: "Educational level is required",
      });
    }

    if (!req.body.major) {
      return res.status(400).json({
        status: 400,
        data: {},
        message: "Major is required",
      });
    }

    if (!req.body.description) {
      return res.status(400).json({
        status: 400,
        data: {},
        message: "Description is required",
      });
    }

    if (!req.body.school) {
      return res.status(400).json({
        status: 400,
        data: {},
        message: "School is required",
      });
    }

    if (!req.body.address_school) {
      return res.status(400).json({
        status: 400,
        data: {},
        message: "School address is required",
      });
    }

    const {
      username,
      role,
      fullName,
      avatar,
      phone,
      email,
      address,
      birthday,
      educational_level,
      major,
      description,
      school,
      address_school,
    } = req.body;
    console.log(req.file, req.body);
    let imageT = null;
    if (!req.file) {
      imageT = avatar;
    } else {
      imageT = req.file.path;
    }
    console.log(imageT, avatar);
    let result: informationResponse;
    result = await UserService.updateInformation({
      username,
      role,
      fullName,
      avatar: imageT,
      phone,
      email,
      address,
      birthday,
      educational_level,
      major,
      description,
      school,
      address_school,
    });

    if (result?.status) {
      res.status(200).json({
        status: 200,
        data: {
          username,
          role,
          fullName,
          avatar: imageT,
          phone,
          email,
          address,
          birthday,
          educational_level,
          major,
          description,
          school,
          address_school,
        },
        message: result?.message,
      });
    } else {
      res.status(400).json({
        status: 400,
        message: result?.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      data: {},
      message: error,
    });
  }
};

const isValidEmail = async (req: Request, res: Response) => {
  const { email } = req.body;
  console.log(email);
  try {
    const token: string = crypto.randomBytes(20).toString("hex");
    const isValidEmail = await UserService.isValidEmail({ email, token });
    if (isValidEmail?.status) {
      res.status(200).json({
        status: 200,
        message: isValidEmail?.message,
      });
    } else {
      res.status(404).json({
        status: 404,
        message: isValidEmail?.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      data: {},
      message: error,
    });
  }
};

const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, newPassword } = req.body;
    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(newPassword, salt);
    const resetPass = await UserService.resetPassword({
      newPassword: passwordHashed,
      token,
    });
    if (resetPass?.status) {
      res.status(200).json({
        status: 200,
        message: resetPass.message,
      });
    } else {
      res.status(404).json({
        status: 404,
        message: resetPass.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      data: {},
      message: error,
    });
  }
};

const getInforTeacher = async (req: Request, res: Response) => {
  try {
    const { teacher_id } = req.params;
    let result: any;
    result = await UserService.getInforTeacher(teacher_id);
    if (result?.status) {
      const { password, ...others } = result?.data[0];
      res.status(200).json({
        status: result?.status,
        data: others,
        message: result.message,
      });
    } else {
      res.status(404).json({
        status: 404,
        message: result.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      data: {},
      message: error,
    });
  }
};

const changePassword = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(password, salt);
    const changePass = await UserService.changePassword(
      username,
      passwordHashed
    );
    if (changePass?.status) {
      res.status(200).json({
        status: 200,
        message: changePass.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      data: {},
      message: error,
    });
  }
};

const getProcessCourseByStudentId = async (req: Request, res: Response) => {
  try {
    const { student_id } = req.params;
    const result = await UserService.getProcessCourseByStudentId(student_id);
    if (result?.status) {
      res.status(200).json({
        status: 200,
        data: result?.data,
        message: result.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      data: {},
      message: error,
    });
  }
};

export default {
  login,
  refreshToken,
  logout,
  register,
  updateInformation,
  isValidEmail,
  resetPassword,
  getInforTeacher,
  changePassword,
  getProcessCourseByStudentId,
};
