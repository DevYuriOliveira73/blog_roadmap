import { Router } from "express";
import userRoutes from "./user.route";
import postRoutes from "./post.route";
import authRoutes from "./auth.route";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.use("/users", userRoutes);
router.use("/user", authMiddleware, postRoutes);
router.use("/auth", authRoutes);

export default router;
