import {Request, Response} from "express"
import {CreatePostDTO} from "../../dtos/post.dto"
import * as postService from "../../services/post.service"
import { getParams } from "../../utils/getParams"

export async function createPostController(req: Request, res: Response) {

  try {

    const post = await postService.createPostService(req.body as CreatePostDTO)

    res.status(201).json({message: `Post "${post.title}" created successfully`, post})

  } catch (error) {

    res.status(400).json({message: "Error creating post", error})

  }

}

export async function getAllPostsController(req: Request, res: Response) {
  try {
    const { idUser } = getParams(req);

    const posts = await postService.getAllPostsService(idUser)

    res.status(200).json(posts)

  } catch (error) {
    res.status(400).json({message: "Error getting posts", error})
  }
}


export async function deletePostController(req: Request, res: Response) {
  try {
    const { idUser, idPost } = getParams(req);

    if (idPost === undefined) {
      res.status(400).json({message: "idPost is required"})
      return
    }

    const post = await postService.deletePostService(idUser, idPost)

    res.status(200).json({message: `Post ${post.title} deleted successfully`, post})
  } catch (error) {
    res.status(400).json({message: "Error deleting post", error})
  }
}

export async function updatePostController(req: Request, res: Response) {
  try {
    const { idUser, idPost } = getParams(req);

    if (idPost === undefined) {
      res.status(400).json({message: "idPost is required"})
      return
    }

    const post = await postService.updatePostService(idUser, idPost, req.body);

    res.status(200).json({message: `Post ${post.title} updated successfully`, post});

  } catch (error) {

    res.status(400).json({message: "Error updating post", error});

  }
}

export async function getPostByIdController(req: Request, res: Response) {
  try {
    const { idUser, idPost } = getParams(req);

    if (idPost === undefined) {
      res.status(400).json({message: "idPost is required"})
      return
    }

    const post = await postService.getPostByIdService(idUser, idPost);

    res.status(200).json(post);

  } catch (error) {

    res.status(400).json({message: "Error updating post", error});

  }
}
