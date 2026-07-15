import {CreateUserDTO} from "../dtos/user.dto"
import * as userRepository from "../repositories/user/user.repository"
import { UserResponseDTO } from "../dtos/user.dto"
import { removePasswordFromArray } from "../utils/remove-password-user"

export async function createUserService(data : CreateUserDTO) : Promise<UserResponseDTO> {

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

  return await userRepository.createUserRepository({
    email: data.email,
    name: data.name,
    password: data.password
  })
}

export async function getAllUsersService(): Promise<UserResponseDTO[] | null> {
  const users = await userRepository.getAllUsersRepository();
  if (users.length === 0) {
    return null;
  }


  return users;
}

export async function searchByEmailLikeService(term: string): Promise<UserResponseDTO[] | null> {

  if (term.trim().length === 0) {
    throw new Error("Termo de busca é obrigatório");
  }

  const users = await userRepository.fingByEmailLike(term);

  return users
}

