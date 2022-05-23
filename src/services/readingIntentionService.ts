import readingIntentionRepository, {
  CreateReadingIntentionData,
} from "../repositories/readingIntentionRepository.js";
import {
  conflictError,
  notFoundError,
  unauthorizedError,
} from "../utils/errorUtils.js";

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

async function increasePriorityById(userId: number, id: number) {
  const intentions = await readingIntentionRepository.findByUserId(userId);
  const lastIndex = intentions.length - 1;

  // For an empty list
  if (lastIndex === -1) {
    throw notFoundError(
      "A intenção de leitura não foi encontrada entre as do usuário"
    );
  }

  if (intentions[0].id === id) return; // do nothing for the most priority intention

  // Linear search by id (the list is ordered by priority, not by id)
  for (let i = 1; i <= lastIndex; i++) {
    if (intentions[i].id === id) {
      const { id: i1, priority: p1 } = intentions[i];
      const current = { id: i1, priority: p1 };
      const { id: i2, priority: p2 } = intentions[i - 1];
      const prev = { id: i2, priority: p2 };

      // Swapping priorities in DB
      await readingIntentionRepository.swapIntentionPriorities(current, prev);
      return;
    }
  }

  // If the reading intention is not found among those of user
  throw notFoundError(
    "A intenção de leitura não foi encontrada entre as do usuário"
  );
}

async function decreasePriorityById(userId: number, id: number) {
  const intentions = await readingIntentionRepository.findByUserId(userId);
  const lastIndex = intentions.length - 1;

  // For an empty list
  if (lastIndex === -1) {
    throw notFoundError(
      "A intenção de leitura não foi encontrada entre as do usuário"
    );
  }

  if (intentions[lastIndex].id === id) return; // do nothing for the least priority intention

  // Linear search by id (the list is ordered by priority, not by id)
  for (let i = 0; i < lastIndex; i++) {
    if (intentions[i].id === id) {
      const { id: i1, priority: p1 } = intentions[i];
      const current = { id: i1, priority: p1 };
      const { id: i2, priority: p2 } = intentions[i + 1];
      const next = { id: i2, priority: p2 };

      // Swapping priorities in DB
      await readingIntentionRepository.swapIntentionPriorities(current, next);
      return;
    }
  }

  // If the reading intention is not found among those of user
  throw notFoundError(
    "A intenção de leitura não foi encontrada entre as do usuário"
  );
}

async function deleteById(userId: number, id: number) {
  const intention = await findByIdOrFail(id);

  if (intention.userId !== userId) {
    throw unauthorizedError("A intenção de leitura não é do usuário");
  }

  await readingIntentionRepository.deleteById(id);
}

async function findByIdOrFail(id: number) {
  const intention = await readingIntentionRepository.findById(id);
  if (!intention) {
    throw notFoundError("Não há intenção de leitura com o ID especificado");
  }

  return intention;
}

export default {
  create,
  getByUserId,
  increasePriorityById,
  decreasePriorityById,
  deleteById,
};
