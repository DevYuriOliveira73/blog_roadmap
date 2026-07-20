import { z } from 'zod';

export const createUserSchema = z.object({
  email: z.email('email inválido'),
  name: z.string().min(1, 'name é obrigatório').max(255),
  password: z.string().min(6, 'password deve ter no mínimo 6 caracteres'),
});

export type CreateUserDTO = z.infer<typeof createUserSchema>;


export interface UserResponseDTO {
  id: number;
  name: string;
  email: string;
}
