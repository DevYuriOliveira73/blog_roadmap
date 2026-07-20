// routes/auth.route.ts
import { Router } from "express";
import { loginController } from "../controllers/auth.controller";
import { validate } from "../middleware/validation.middleware";
import { loginSchema } from "../dtos/auth.dto";

const router = Router();

router.post("/login", validate(loginSchema), loginController);

export default router;
