import {Request, Response} from "express"
import {CreatePostDTO} from "../../dtos/post.dto"
import * as postService from "../../services/post.service"

export async function createPostController(req: Request, res: Response) {

  try {

    const post = await postService.createPostService(req.body as CreatePostDTO)

    res.status(201).json({message: `Post ${post.title} created successfully`, post})

  } catch (error) {

    res.status(400).json({message: "Error creating post", error})

  }

}

export async function getAllPostsController(req: Request, res: Response) {
  try {
    const idUser = req.params.idUser;
    const idUserNumber = Number(idUser);

    const posts = await postService.getAllPostsService(idUserNumber)

    res.status(200).json(posts)

  } catch (error) {
    res.status(400).json({message: "Error getting posts", error})
  }
}

// export async function searchByEmailLikeController(req: Request, res: Response) {
//   try {
//     const { email : term } = req.query;
//     const users = await userService.searchByEmailLikeService(term as string);
//     res.status(200).json(users);
//   } catch (error) {

//     res.status(400).json({message: "Error searching user", error})

//   }
// }
