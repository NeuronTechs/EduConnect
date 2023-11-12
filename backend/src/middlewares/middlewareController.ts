import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}
const middlewareController = {
  verifyToken: (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers?.authorization as string | undefined;

    if (token) {
      const accessToken = token.split(" ")[1];
      jwt.verify(
        accessToken,
        "educonnect",
        (error: jwt.VerifyErrors | null, user: any) => {
          if (error) {
            res.status(403).json("Token in valid");
          } else {
            req.user = user;
            next();
          }
        }
      );
    } else {
      res.status(401).json("You're not authenticated");
      return;
    }
  },
};
export default middlewareController;
