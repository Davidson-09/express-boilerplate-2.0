import { Router } from "express";
import userRoutes from "./users";
import postRoutes from "./posts"
import sessionRoutes from "./sessions"

const router = Router();

router.use(userRoutes);
router.use(postRoutes);
router.use(sessionRoutes);

export default router;