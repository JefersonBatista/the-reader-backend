import { Request, Response } from "express";

import { CreateReadingData } from "../repositories/readingRepository.js";
import readingService from "../services/readingService.js";

async function create(req: Request, res: Response) {
  const reading = req.body as CreateReadingData;
  const { userId } = res.locals as { userId: number };

  await readingService.create(userId, reading);

  res.sendStatus(201);
}

export default { create };
