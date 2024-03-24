import { Request, Response } from "express";
import { authenticateUser, createUser, getSingleUserWithEmail, getUsers, userExists } from "./users.service";
import { createUserSchema, loginSchema } from "./users.validator";
import logger from "../../utils/logger";

export class UserController {

  async getUsers(req: Request, res: Response) {
    // await createUserSchema.validateAsync(req.body);
    const result = await getUsers();
    res.status(200).json(result);
  }

  async createUser(req: Request, res: Response) {
    try{
      await createUserSchema.validateAsync(req.body);
      if (await userExists(req.body.email)){
        return res.status(400).json({message:"user already exists"})
      }
      const result = await createUser(req.body);
      logger.info(`User created: ${req.body.email}`)
      return res.status(200).json(result)
    } catch(e){
      logger.error(e)
      res.status(500).send({message:e})
    }
  }
}