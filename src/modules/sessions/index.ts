import { Router } from "express";
import { SessionController } from "./sessions.controller";

const router = Router();
const sessionController = new SessionController();

router.post("/login", sessionController.login);

export default router;