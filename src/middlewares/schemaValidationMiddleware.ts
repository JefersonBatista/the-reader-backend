import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";

export default function validateSchema(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const object = req.body;

    const validation = schema.validate(object);
    if (validation.error) {
      return res
        .status(400)
        .send("Todos os campos devem ser corretamente preenchidos");
    }

    next();
  };
}
