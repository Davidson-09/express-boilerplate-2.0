import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();
import logger from "../utils/logger";
import { Auth } from "../types/express";

export default function requireUser(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader){
      return res.status(400).send({message: "No authentication header detected"})
    }
    const token = authHeader.split(' ')[1]
    if (!token){
      return res.status(401).send({message: "No bearer token detected"})
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as Secret, (err, user)=>{
      if (err){
        logger.error('requireUser error:', err)
        res.status(403).send()
      }
      req.user = user as Auth
    })
    next();
  } catch (err) {
    next(err);
  }
}