// middleware/auth.middleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

import { AuthTokenPayload } from "../dtos/auth.dto";


export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  console.log("authHeader:", authHeader);

  // next();

  // 1. E se authHeader não existir? o que devolver?
  if (!authHeader) {
    return res.status(401).json({ message: "Header authorization necessario" });
  }

  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Header authorization malformado" });
  }

  // 2. Como você separa "Bearer" do token de verdade?
  const token = authHeader.split(" ")[1];

  console.log("token: ", token);
  try {
    // 3. Como você verifica o token e recupera o payload?
    const {userId} = jwt.verify(token!, env.JWT_SECRET) as AuthTokenPayload;

    if (!userId) {
      return res.status(401).json({ message: "Token inválido" });
    }

    // 4. Onde você guarda o userId pra o Controller conseguir usar depois?
    req.metadata= {userId : Number(userId)};

    console.log("req.metadata: ", req.metadata);
    next();
  } catch (error) {
    // 5. O que pode dar errado aqui? (dica: token expirado é um erro diferente de token malformado)
    return res.status(401).json({ message: "Token inválido", error });
  }
}
