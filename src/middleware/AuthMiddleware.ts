import { Request, Response, NextFunction } from "express";
import { ObtainToken } from "../utils/getToken.js";
import { verifyToken } from "../utils/tokenVerification.js";

interface CustomRequest extends Request {
  userAuth?: string;
}

class AuthMiddleware {
  public loggedIn = (req: CustomRequest, res: Response, next: NextFunction): any => {
    try {
      const token = ObtainToken(req);
      if (!token) throw new Error("A token is required for authentication");
      
      const userAccess: any = verifyToken(token);
      req.userAuth = userAccess.id;
      next();
    } catch (err: any) {
      return res.status(403).json({
        message: err.message
      });
    }
  };
}

export default new AuthMiddleware();
