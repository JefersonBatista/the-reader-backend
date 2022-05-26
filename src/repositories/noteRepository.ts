import { Note } from "@prisma/client";
import prisma from "../database.js";

export type CreateNoteData = Omit<Note, "id" | "userId" | "readingId" | "time">;

async function insert(userId: number, readingId: number, data: CreateNoteData) {
  await prisma.note.create({ data: { userId, readingId, ...data } });
}

async function getByReadingId(readingId: number) {
  const notes = await prisma.note.findMany({ where: { readingId } });
  return notes;
}

export default { insert, getByReadingId };
