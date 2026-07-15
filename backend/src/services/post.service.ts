import {CreatePostDTO, PostResponseDTO} from "../dtos/post.dto"
import * as postRepository from "../repositories/post/post.repository"

export async function createPostService(data : CreatePostDTO) : Promise<PostResponseDTO> {

  return await postRepository.createPostRepository(data)

}


