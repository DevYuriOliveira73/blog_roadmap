import {Request, Response} from "express"

export function getParams(req: Request): { idUser: number, idPost?: number } {

  const idUser = Number(req.params.idUser);
  const idPost = req.params.idPost ? Number(req.params.idPost) : null;

  if (idPost == null) {
    return { idUser };
  }

  return { idUser, idPost };
}
