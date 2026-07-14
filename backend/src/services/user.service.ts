import {CreateUserDTO} from "../dtos/user.dto"
import * as userRepository from "../repositories/user/user.repository"
import { UserResponseDTO } from "../dtos/user.dto"

export async function createUserService(data : CreateUserDTO) : Promise<UserResponseDTO> {

  if (!data.email || !data.password) {
    throw new Error("Email e senha são obrigatórios");
  }

  if (!data.name) {
    throw new Error("Nome é obrigatório!");
  }

  const existingUser = await userRepository.findUserByEmail(data.email);
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

  const usersWhitoutPassword = users.map(user =>{
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  })

  return usersWhitoutPassword;
}
