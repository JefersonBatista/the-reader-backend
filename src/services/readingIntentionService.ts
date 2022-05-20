import readingIntentionRepository, {
  CreateReadingIntentionData,
} from "../repositories/readingIntentionRepository.js";
import { conflictError } from "../utils/errorUtils.js";

async function create(userId: number, data: CreateReadingIntentionData) {
  const { title } = data;

  const existing = await readingIntentionRepository.findByTitle(userId, title);
  if (existing) {
    throw conflictError("Já há uma intenção de leitura para esse título");
  }

  await readingIntentionRepository.insert(userId, data);
}

async function getByUserId(userId: number) {
  const intentions = readingIntentionRepository.findByUserId(userId);
  return intentions;
}

export default { create, getByUserId };
