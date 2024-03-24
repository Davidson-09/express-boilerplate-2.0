import { Request, Response } from "express";
import { authenticateUser, createNewSession, createUser, getSingleUserWithEmail, getUsers, userExists } from "./users.service";
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

  async login(req: Request, res: Response){
    // login the user
    try{
      // authenitcate user
      await loginSchema.validateAsync(req.body);
      const user = await getSingleUserWithEmail(req.body.email)
      if (!user){
        return res.status(400).send({message: "Cannot find user"})
      }
      const isAuthenticated = await authenticateUser({providedPassword:req.body.password, userPassword: user.password})
      if (!isAuthenticated){
        return res.status(400).send({message:"Wrong email or password"})
      }
      // carry on
      const accessToken = createNewSession(user)

      return res.status(200).send({accessToken})
    }catch(e){
      logger.error(e)
      res.status(500).send({message:"Error logging you in"})
    }
  }
}