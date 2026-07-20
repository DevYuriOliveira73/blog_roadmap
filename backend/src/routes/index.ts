import { Router } from "express";
import userRoutes from "./user.route";
import postRoutes from "./post.route";
import authRoutes from "./auth.route";

const router = Router();

router.use("/users", userRoutes);
router.use("/users", postRoutes);
router.use("/auth", authRoutes);

export default router;
