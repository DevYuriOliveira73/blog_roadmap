import { Request, Response, NextFunction } from 'express';
import { ZodType } from 'zod';

export function validate(schema: ZodType) {
  return (req: Request, res: Response, next: NextFunction) => {
    const idUser = req.params.idUser;
    const idUserNumber = Number(idUser);

    const requestBody = { ...req.body, authorId: idUserNumber };
    const result = schema.safeParse(requestBody);

    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));

      return res.status(400).json({
        message: "Dados inválidos",
        errors,
      });
    }

    req.body = result.data;
    next();
  };
}
