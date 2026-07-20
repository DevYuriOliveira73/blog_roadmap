import { Request, Response, NextFunction } from "express";
import * as authService from "../services/auth.service";
import { LoginDTO } from "../dtos/auth.dto";

export async function loginController(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await authService.loginService(req.body as LoginDTO);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}
