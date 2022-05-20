import { ReadingIntention } from "@prisma/client";
import prisma from "../database.js";

export type CreateReadingIntentionData = Omit<
  ReadingIntention,
  "id" | "userId" | "priority" | "date"
>;

async function insert(userId: number, data: CreateReadingIntentionData) {
  await prisma.readingIntention.create({ data: { userId, ...data } });
}

async function findByTitle(userId: number, title: string) {
  const intention = await prisma.readingIntention.findFirst({
    where: { userId, title },
  });

  return intention;
}

async function findByUserId(userId: number) {
  const intentions = await prisma.readingIntention.findMany({
    where: { userId },
    orderBy: { priority: "asc" },
  });

  return intentions;
}

/* async function increasePriorityById(userId: number, id: number) {
  const intentions = findByUserId(userId);
}

async function decreasePriorityById(userId: number, id: number) {} */

export default {
  insert,
  findByTitle,
  findByUserId,
  /* increasePriorityById,
  decreasePriorityById, */
};
