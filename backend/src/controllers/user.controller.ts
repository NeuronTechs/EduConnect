import jwt from "jsonwebtoken";
import UserService from "../services/user.service";
import e, { Request, Response, NextFunction } from "express";
import { User, informationResponse, registerResponse } from "../constant/user";
import bcrypt from "bcrypt";

let refreshTokens: string[] = [];
const generateAccessToken = (
  userId: number | undefined,
  role: string | null | undefined
): string => {
  return jwt.sign(
    {
      userId: userId,
      role: role,
    },
    "educonnect",
    { expiresIn: "60s" }
  );
};
const generatefreshToken = (
  userId: number | undefined,
  role: string | null | undefined
): string => {
  return jwt.sign(
    {
      userId: userId,
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
      !req.body?.fullName
    ) {
      res.status(400).json({
        status: 400,
        data: {},
        message: "username, password, email and fullName is require!",
      });
    } else {
      const { username, password, fullName, email } = req.body;
      let result: registerResponse;
      const salt = await bcrypt.genSalt(10);
      const passwordHashed = await bcrypt.hash(password, salt);
      result = await UserService.register(
        username,
        passwordHashed,
        fullName,
        email
      );

      if (result?.status) {
        const accessToken: string = generateAccessToken(
          result?.data?.userId,
          result?.data?.role
        );
        const refreshToken: string = generatefreshToken(
          result?.data?.userId,
          result?.data?.role
        );
        refreshTokens.push(refreshToken);
        res.setHeader("token", "Bearer " + accessToken);
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
    const { username, password } = req.body;
    if (req.body?.username && req.body?.password) {
      if (username.trim() === "" || password.trim() === "") {
        res.status(400).json({
          status: 400,
          data: {},
          message: "field is require!",
        });
      } else {
        let result: User[];
        result = await UserService.login(username);
        if (result.length > 0) {
          if (await isValidPassword(password, result[0]?.password)) {
            const accessToken: string = generateAccessToken(
              result[0]?.userId,
              result[0]?.role
            );
            const refreshToken: string = generatefreshToken(
              result[0]?.userId,
              result[0]?.role
            );
            refreshTokens.push(refreshToken);
            res.setHeader("token", "Bearer " + accessToken);
            res.cookie("refreshToken", refreshToken, {
              httpOnly: true,
              secure: false,
              path: "/",
              sameSite: "strict",
            });
            const { password, ...others } = result[0];
            res.status(200).json({
              status: 200,
              data: { ...others, accessToken },
              message: "get value success",
            });
          } else {
            res.status(400).json({
              status: 400,
              data: {},
              message: "incorrect password",
            });
          }
        } else {
          res.status(400).json({
            status: 400,
            data: {},
            message: "incorrect username",
          });
        }
      }
    } else {
      if (!req.body?.username && req.body?.password) {
        res.status(400).json({
          status: 400,
          data: {},
          message: "The username field is require!",
        });
      }
      if (req.body?.username && !req.body?.password) {
        res.status(400).json({
          status: 400,
          data: {},
          message: "The password field is require!",
        });
      }
      if (!req.body?.username && !req.body?.password) {
        res.status(400).json({
          status: 400,
          data: {},
          message: "The username and password field is require!",
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
    const refreshToken = cookiesHeader.replace("refreshToken=", "");
    if (!refreshTokens.includes(refreshToken)) {
      return res.status(403).json("refresh token is not valid");
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
    return res.status(401).json("you're not authenticated");
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
    if (
      !req.body?.userId ||
      !req.body?.role ||
      !req.body?.fullName ||
      !req.body?.avatar ||
      !req.body?.phone ||
      !req.body?.email ||
      !req.body?.address ||
      !req.body?.birthday ||
      !req.body?.educational_level ||
      !req.body?.major ||
      !req.body?.course ||
      !req.body?.school ||
      !req.body?.address_school
    ) {
      res.status(400).json({
        status: 400,
        data: {},
        message:
          "userId, role, fullName, avatar, phone, email, address, birthday, educational_level, major, course, school and address_school is require!",
      });
    } else {
      const {
        userId,
        role,
        fullName,
        avatar,
        phone,
        email,
        address,
        birthday,
        educational_level,
        major,
        course,
        school,
        address_school,
      } = req.body;
      let result: informationResponse;
      result = await UserService.updateInformation({
        userId,
        role,
        fullName,
        avatar,
        phone,
        email,
        address,
        birthday,
        educational_level,
        major,
        course,
        school,
        address_school,
      });

      if (result?.status) {
        res.status(200).json({
          status: 200,
          message: result?.message,
        });
      } else {
        res.status(400).json({
          status: 400,
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

export default {
  login,
  refreshToken,
  logout,
  register,
  updateInformation,
};
