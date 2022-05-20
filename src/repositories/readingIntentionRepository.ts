import { ReadingIntention } from "@prisma/client";
import prisma from "../database.js";

export type CreateReadingIntentionData = Omit<
  ReadingIntention,
  "id" | "userId" | "priority" | "date"
>;

export type IntentionPriority = {
  id: number;
  priority: number;
};

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

async function swapIntentionPriorities(
  ip1: IntentionPriority,
  ip2: IntentionPriority
) {
  await prisma.readingIntention.update({
    where: { id: ip1.id },
    data: { priority: 0 },
  });

  await prisma.readingIntention.update({
    where: { id: ip2.id },
    data: { priority: ip1.priority },
  });

  await prisma.readingIntention.update({
    where: { id: ip1.id },
    data: { priority: ip2.priority },
  });
}

export default {
  insert,
  findByTitle,
  findByUserId,
  swapIntentionPriorities,
};
