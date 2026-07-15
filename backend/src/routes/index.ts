import { Router } from "express";
import userRoutes from "./user.route";
import postRoutes from "./post.route";


const router = Router();

router.use("/users", userRoutes);
router.use("/users", postRoutes);

export default router;
