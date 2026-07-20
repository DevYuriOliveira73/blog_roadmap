// services/auth.service.ts
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as userRepository from "../repositories/user/user.repository";
import { LoginDTO } from "../dtos/auth.dto";
import { env } from "../config/env";

export async function loginService(data: LoginDTO): Promise<{ token: string }> {
  const user = await userRepository.findByEmail(data.email);
  if (!user) {
    throw new Error("Credenciais inválidas");
  }

  const passwordMatches = await bcrypt.compare(data.password, user.password);
  if (!passwordMatches) {
    throw new Error("Credenciais inválidas");
  }

  const token = jwt.sign(
    { userId: user.id },
    env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return { token };
}
