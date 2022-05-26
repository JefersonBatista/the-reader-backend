import noteRepository, {
  CreateNoteData,
} from "../repositories/noteRepository.js";
import readingService from "./readingService.js";

async function create(userId: number, readingId: number, data: CreateNoteData) {
  const reading = await readingService.findByIdOrFail(readingId);
  readingService.checkIfReadingIsOfUser(userId, reading);

  await noteRepository.insert(userId, readingId, data);
}

async function getByReadingId(userId: number, readingId: number) {
  const reading = await readingService.findByIdOrFail(readingId);
  readingService.checkIfReadingIsOfUser(userId, reading);

  const notes = await noteRepository.getByReadingId(readingId);
  return notes;
}

export default { create, getByReadingId };
