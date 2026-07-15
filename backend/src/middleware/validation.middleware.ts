import { Request, Response, NextFunction } from 'express';
import { ZodType } from 'zod';

export function validate(schema: ZodType) {
  return (req: Request, res: Response, next: NextFunction) => {
    const idUser = req.params.idUser;
    const idUserNumber = Number(idUser);

    const requestBody = { ...req.body, authorId: idUserNumber };
    const result = schema.safeParse(requestBody);

    if (!result.success) {
      return res.status(400).json({
        message: 'Dados inválidos',
        errors: result.error.flatten().fieldErrors,
      });
    }

    req.body = result.data; // body agora tipado e "limpo" (com defaults aplicados)
    next();
  };
}
