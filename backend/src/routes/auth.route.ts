// routes/auth.route.ts
import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import { validate } from "../middleware/validation.middleware";
import { loginSchema,registerSchema } from "../dtos/auth.dto";

const router = Router();

router.post("/login", validate(loginSchema), authController.loginController);
router.post("/register", validate(registerSchema), authController.registerController);

export default router;
