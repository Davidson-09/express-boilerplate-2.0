import { Request, Response } from "express";
import logger from "../../utils/logger";
import { loginSchema } from "./sessions.validator";
import { getSingleUserWithEmail } from "../users/users.service";
import { authenticateUser } from "../users/users.service";
import { createNewSession } from "./sessions.service";

export class SessionController {

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
      const tokens = await createNewSession(user)

      return res.status(200).send({...tokens})
    }catch(e){
      logger.error(e)
      res.status(500).send({message:"Error logging you in"})
    }
  }

}