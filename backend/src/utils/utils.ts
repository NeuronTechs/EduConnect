import e, { Request } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";
import environment from "../config/environment";
interface IToken {
  userId: string;
  role: string;
  iat: number;
  exp: number;
}
const getToken = (req: Request) => {
  const token = req.headers.authorization?.split(" ")[1];

  return token;
};
const getTokenUserId = async (req: Request) => {
  const token = req.headers.authorization?.split(" ")[1];
  try {
    if (token) {
      const decodedToken = (await jwt.verify(
        token,
        environment.PRIVATE_KEY as string
      )) as IToken;
      return decodedToken.userId;
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export { getToken, getTokenUserId };
