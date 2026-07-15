import {CreatePostDTO, PostResponseDTO} from "../dtos/post.dto"
import * as postRepository from "../repositories/post/post.repository"

export async function createPostService(data : CreatePostDTO) : Promise<PostResponseDTO> {

  return await postRepository.createPostRepository(data)

}

export async function getAllPostsService(id: number) : Promise<any> {

  return await postRepository.getAllPostsRepository(id)

}


export async function deletePostService(idUser: number, idPost: number) : Promise<any> {

  return await postRepository.deletePostRepository(idUser, idPost)

}


export async function updatePostService(idUser: number, idPost: number, data: Partial<CreatePostDTO>) {

  return await postRepository.updatePostRepository(idUser, idPost, data);

}

export async function getPostByIdService(idUser: number, idPost: number) : Promise<any> {

  return await postRepository.getPostByIdRepository(idUser, idPost)

}
