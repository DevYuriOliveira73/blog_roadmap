// middleware/auth.middleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

import { AuthTokenPayload } from "../dtos/auth.dto";


export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  console.log("authHeader:", authHeader);


  if (!authHeader) {
    return res.status(401).json({ message: "Header authorization necessario" });
  }

  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Header authorization malformado" });
  }

  const token = authHeader.split(" ")[1];

  try {
  const { userId } = jwt.verify(token!, env.JWT_SECRET) as AuthTokenPayload;

  if (!userId) {
    return res.status(401).json({ message: "Token inválido" });
  }

  req.metadata = { userId: Number(userId) };

  next();
} catch (error) {
  if (error instanceof jwt.TokenExpiredError) {
    return res.status(401).json({ message: "Token expirado" });
  }

  if (error instanceof jwt.JsonWebTokenError) {
    return res.status(401).json({ message: "Token inválido" });
  }

  console.error(error);
  return res.status(500).json({ message: "Erro ao validar token" });
}
}
