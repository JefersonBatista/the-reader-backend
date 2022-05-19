import { Request, Response } from "express";

import { CreateReadingIntentionData } from "../repositories/readingIntentionRepository.js";
import readingIntentionService from "../services/readingIntentionService.js";

async function create(req: Request, res: Response) {
  const intention = req.body as CreateReadingIntentionData;
  const { userId } = res.locals as { userId: number };

  await readingIntentionService.create(userId, intention);

  res.sendStatus(201);
}

export default { create };
