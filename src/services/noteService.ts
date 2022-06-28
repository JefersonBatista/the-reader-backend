import noteRepository, {
  CreateNoteData,
} from "../repositories/noteRepository.js";
import readingService from "./readingService.js";

async function create(userId: number, readingId: number, data: CreateNoteData) {
  await readingService.getById(userId, readingId);

  await noteRepository.insert(userId, readingId, data);
}

async function getByReadingId(userId: number, readingId: number) {
  await readingService.getById(userId, readingId);

  const notes = await noteRepository.getByReadingId(readingId);
  return notes;
}

export default { create, getByReadingId };
