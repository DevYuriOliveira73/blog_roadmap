import { prisma } from "../../database/prisma"
import { CreateUserDTO } from "../../dtos/user.dto"
import {UserResponseDTO} from "../../dtos/user.dto"


export async function createUserRepository({email, name, password}: CreateUserDTO) : Promise<UserResponseDTO> {
  const user = await prisma.user.create({
    data: {
      email,
      name,
      password
    }
  })

  return {
    id: user.id,
    name: user.name,
    email: user.email
  }
}

export async function findByEmail(email: string) {
  const user = await prisma.user.findUnique({
    where: { email: email }
  })
  return user;
}


export async function getAllUsersRepository() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
  }});
  return users;
}

export async function fingByEmailLike(term: string) {
  const users = await prisma.user.findMany({
    where: {
      email: {
        contains: term,
        mode: "insensitive"
      }
    }
  })

  return users;
}
