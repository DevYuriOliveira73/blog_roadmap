import { User } from "../../generated/prisma/client"

type UserWithoutPassword = Omit<User, "password">

export function removePassword(user: User): UserWithoutPassword {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

export function removePasswordFromArray(users: User[]): UserWithoutPassword[] {
  return users.map(removePassword);
}
