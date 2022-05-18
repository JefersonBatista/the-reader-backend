import readingRepository, {
  CreateReadingData,
} from "../repositories/readingRepository.js";
import {
  conflictError,
  notFoundError,
  unauthorizedError,
} from "../utils/errorUtils.js";

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

async function getByUserId(userId: number) {
  const readings = await readingRepository.findByUserId(userId);
  return readings;
}

async function finishById(userId: number, id: number) {
  const reading = await findByIdOrFail(id);

  if (reading.userId !== userId) {
    throw unauthorizedError("A leitura não é do usuário");
  }

  if (reading.endDate) {
    throw conflictError("A leitura já foi finalizada");
  }

  await readingRepository.finishById(id);
}

async function findByIdOrFail(id: number) {
  const reading = await readingRepository.findById(id);
  if (!reading) {
    throw notFoundError("Não há leitura com o ID especificado");
  }

  return reading;
}

export default { create, getByUserId, finishById };
