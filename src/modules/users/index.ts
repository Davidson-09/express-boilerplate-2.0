import { Router } from "express";
import { UserController } from "./users.controller";

const router = Router();
const userController = new UserController();

router.get("/get-users", userController.getUsers);
router.post("/users", userController.createUser);

export default router;