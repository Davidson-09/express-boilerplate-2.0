import { Router } from "express";
import userRoutes from "./users";
import postRoutes from "./posts"

const router = Router();

router.use(userRoutes);
router.use(postRoutes)

export default router;