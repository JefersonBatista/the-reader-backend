import readingRepository, {
  CreateReadingData,
} from "../repositories/readingRepository.js";
import { conflictError } from "../utils/errorUtils.js";

async function create(userId: number, data: CreateReadingData) {
  const { title } = data;

  const unfinishedReading = await readingRepository.findUnfinishedByTitle(
    title
  );
  if (unfinishedReading) {
    throw conflictError("Já há uma leitura em andamento com esse título");
  }

  await readingRepository.insert(userId, data);
}

export default { create };
