import { Request, Response } from "express";
import logger from "../../utils/logger";

export class PostController {

  async getPosts(req: Request, res: Response) {
    res.status(200).send()
  }

}