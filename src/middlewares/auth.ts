import { NextFunction, Request, Response } from "express";
import { BadRequestException } from "../utils/custom-errors";

export default function authorization(req: Request, _res: Response, next: NextFunction) {
  try {
    const token = req.headers["token"];
    if (!token) {
      throw new BadRequestException('An error occurred');
    }
    req.user = { userId: "userID" };
    next();
  } catch (err) {
    next(err);
  }
}