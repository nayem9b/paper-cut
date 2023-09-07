import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";

import config from "../config";
import { verifyToken } from "../helpers/jwtHelpers";

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //get authorization token
      const token =
        (req.headers.authorization as string) || (req.headers.admin as string);
      console.log(token);
      if (!token) {
        httpStatus.UNAUTHORIZED, "You are not authorized";
      }

      let verifiedUser;

      verifiedUser = verifyToken(token, config.jwt.access_secret as Secret);

      if (verifiedUser.role === "admin") {
        next();
      } else {
        httpStatus.UNAUTHORIZED, "You are not authorized";
        res.send("You are not authorized");
      }
    } catch (error) {
      next(error);
    }
  };

export default auth;
