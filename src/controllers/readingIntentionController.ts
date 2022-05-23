import { Request, Response } from "express";

import { CreateReadingIntentionData } from "../repositories/readingIntentionRepository.js";
import readingIntentionService from "../services/readingIntentionService.js";

async function create(req: Request, res: Response) {
  const intention = req.body as CreateReadingIntentionData;
  const { userId } = res.locals as { userId: number };

  await readingIntentionService.create(userId, intention);

  res.sendStatus(201);
}

async function get(req: Request, res: Response) {
  const { userId } = res.locals as { userId: number };

  const intentions = await readingIntentionService.getByUserId(userId);

  res.send(intentions);
}

async function increasePriority(req: Request, res: Response) {
  const { userId } = res.locals as { userId: number };
  const id = parseInt(req.params.id);
  if (!id) {
    return res.status(400).send("ID inválido");
  }

  await readingIntentionService.increasePriorityById(userId, id);

  res.sendStatus(200);
}

async function decreasePriority(req: Request, res: Response) {
  const { userId } = res.locals as { userId: number };
  const id = parseInt(req.params.id);
  if (!id) {
    return res.status(400).send("ID inválido");
  }

  await readingIntentionService.decreasePriorityById(userId, id);

  res.sendStatus(200);
}

async function remove(req: Request, res: Response) {
  const { userId } = res.locals as { userId: number };
  const id = parseInt(req.params.id);
  if (!id) {
    return res.status(400).send("ID inválido");
  }

  await readingIntentionService.deleteById(userId, id);

  res.sendStatus(200);
}

export default { create, get, increasePriority, decreasePriority, remove };
