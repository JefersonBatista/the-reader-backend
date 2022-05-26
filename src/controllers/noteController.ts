import { Request, Response } from "express";

import { CreateNoteData } from "../repositories/noteRepository.js";
import noteService from "../services/noteService.js";

async function create(req: Request, res: Response) {
  const { userId } = res.locals;
  const readingId = parseInt(req.params.id);
  const note = req.body as CreateNoteData;

  await noteService.create(userId, readingId, note);

  res.sendStatus(201);
}

async function get(req: Request, res: Response) {
  const { userId } = res.locals;
  const readingId = parseInt(req.params.id);

  const notes = await noteService.getByReadingId(userId, readingId);

  res.send(notes);
}

export default { create, get };
