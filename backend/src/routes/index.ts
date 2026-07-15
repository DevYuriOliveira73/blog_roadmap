import { Router } from "express";
import userRoutes from "./user.route";
import postRoutes from "./post.route";
import createPostRoutes from "./createPost.route";


const router = Router();

router.use("/users", userRoutes);
router.use("/users", createPostRoutes);
router.use("/posts", postRoutes);

export default router;
