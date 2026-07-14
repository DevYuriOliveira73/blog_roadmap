export interface CreateUserDTO {
  email: string;
  name: string;
  password: string;
}

export interface UserResponseDTO {
  id: number;
  name: string;
  email: string;
}
