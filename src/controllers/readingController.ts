import { Request, Response } from "express";

import { CreateReadingData } from "../repositories/readingRepository.js";
import readingService from "../services/readingService.js";

async function create(req: Request, res: Response) {
  const reading = req.body as CreateReadingData;
  const { userId } = res.locals as { userId: number };

  await readingService.create(userId, reading);

  res.sendStatus(201);
}

async function get(req: Request, res: Response) {
  const { userId } = res.locals as { userId: number };

  const readings = await readingService.getByUserId(userId);

  res.send(readings);
}

async function finish(req: Request, res: Response) {
  const { userId } = res.locals as { userId: number };
  const id = parseInt(req.params.id);
  if (!id) {
    return res.status(400).send("ID inválido");
  }

  await readingService.finishById(userId, id);

  res.sendStatus(200);
}

export default { create, get, finish };
