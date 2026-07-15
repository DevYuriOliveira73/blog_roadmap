import { Router } from "express";
import userRoutes from "./user.route";
import createPostRoutes from "./createPost.route";


const router = Router();

router.use("/users", userRoutes);
router.use("/users", createPostRoutes);

export default router;
