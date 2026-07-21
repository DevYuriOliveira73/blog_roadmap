// services/auth.service.ts
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as userRepository from "../repositories/user/user.repository";
import { LoginDTO, RegisterDTO } from "../dtos/auth.dto";
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


export async function registerService(data: RegisterDTO): Promise<{ id: number; email: string; name: string }> {

  if (!data.email || !data.password) {
    throw new Error("Email e senha são obrigatórios");
  }

  if (!data.name) {
    throw new Error("Nome é obrigatório!");
  }

  const existingUser = await userRepository.findByEmail(data.email);
  if (existingUser) {
    throw new Error("Usuário já existe!");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const dataReturn = await userRepository.createUserRepository({
    email: data.email,
    name: data.name,
    password: hashedPassword
  })

  return dataReturn;
}

