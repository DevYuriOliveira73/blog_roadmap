import { Request, Response, NextFunction } from 'express';
import { ZodType } from 'zod';

export function validate(schema: ZodType) {
  return (req: Request, res: Response, next: NextFunction) => {
    const userId = req.metadata.userId

    const requestBody = { ...req.body, authorId: userId };
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
