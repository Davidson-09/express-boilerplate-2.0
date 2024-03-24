import { Router } from "express";
import { PostController } from "./posts.controller";
import requireUser from "../../middlewares/auth";

const router = Router();
const postController = new PostController();

router.get("/posts", requireUser, postController.getPosts);

export default router;