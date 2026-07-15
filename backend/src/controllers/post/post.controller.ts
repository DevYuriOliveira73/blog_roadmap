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

// export async function getAllUsersController(req: Request, res: Response) {
//   try {
//     const users = await userService.getAllUsersService();
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(400).json({message: "Error fetching users", error})
//   }
// }

// export async function searchByEmailLikeController(req: Request, res: Response) {
//   try {
//     const { email : term } = req.query;
//     const users = await userService.searchByEmailLikeService(term as string);
//     res.status(200).json(users);
//   } catch (error) {

//     res.status(400).json({message: "Error searching user", error})

//   }
// }
