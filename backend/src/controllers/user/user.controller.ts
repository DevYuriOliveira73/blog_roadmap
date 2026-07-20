import {Request, Response} from "express"
import {CreateUserDTO, createUserSchema} from "../../dtos/user.dto"
import * as userService from "../../services/user.service"


export async function createUserController(req: Request, res: Response) {

  try {

    const {email,name, password} = req.body as CreateUserDTO
    const user = await userService.createUserService({email, name, password})

    res.status(201).json({message: `User ${user.name} created successfully`, user})

  } catch (error) {

    res.status(400).json({message: "Error creating user", error})

  }

}

export async function getAllUsersController(req: Request, res: Response) {
  try {
    const users = await userService.getAllUsersService();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({message: "Error fetching users", error})
  }
}

export async function searchByEmailLikeController(req: Request, res: Response) {
  try {
    const { email : term } = req.query;
    const users = await userService.searchByEmailLikeService(term as string);
    res.status(200).json(users);
  } catch (error) {

    res.status(400).json({message: "Error searching user", error})

  }
}
