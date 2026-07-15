import { z } from 'zod';

export const createPostSchema = z.object({
  title: z.string().min(1, 'title é obrigatório').max(255),
  content: z.string().min(1, 'content é obrigatório'),
  category: z.string().min(1, 'category é obrigatório'),
  tags: z.array(z.string()).default([]),
  published: z.boolean().optional().default(false),
  authorId: z.number().int().positive(),
});

export type CreatePostDTO = z.infer<typeof createPostSchema>;


export interface PostResponseDTO {
  title: string;
  id: number;
}
