import { prisma } from "../../database/prisma"
import { CreatePostDTO, PostResponseDTO } from "../../dtos/post.dto"


export async function createPostRepository(data: CreatePostDTO) : Promise<PostResponseDTO> {
  const post = await prisma.post.create({
    data: {
      title: data.title,
      content: data.content,
      category: data.category,
      tags: data.tags,
      published: data.published,
      authorId: data.authorId
    }
  })

  return {
    id: post.id,
    title: post.title,
  }
}

// export async function findByEmail(email: string) {
//   const user = await prisma.user.findUnique({
//     where: { email: email }
//   })
//   return user;
// }


export async function getAllPostsRepository(id: number) {
  const posts = await prisma.post.findMany({
    where: {
      authorId: id
    }
  });
  return posts;
}

// export async function fingByEmailLike(term: string) {
//   const users = await prisma.user.findMany({
//     where: {
//       email: {
//         contains: term,
//         mode: "insensitive"
//       }
//     }
//   })

//   return users;
// }
