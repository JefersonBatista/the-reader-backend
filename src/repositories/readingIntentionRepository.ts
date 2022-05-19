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

export default { insert, findByTitle };
