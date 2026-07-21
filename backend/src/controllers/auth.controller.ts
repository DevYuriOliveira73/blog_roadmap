import { Request, Response, NextFunction } from "express";
import * as authService from "../services/auth.service";
import { LoginDTO, RegisterDTO } from "../dtos/auth.dto";

export async function loginController(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await authService.loginService(req.body as LoginDTO);

    res.status(200).json(result);
  } catch (error) {
    console.error("Error in loginController:", error);
    next(error);
  }
}


export async function registerController(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await authService.registerService(req.body as RegisterDTO);
    res.status(201).json(result);
  } catch (error) {
    console.error("Error in registerController:", error);
    next(error);
  }
}
