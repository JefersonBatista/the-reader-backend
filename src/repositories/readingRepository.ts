import { Reading } from "@prisma/client";
import prisma from "../database.js";

export type CreateReadingData = Omit<
  Reading,
  "id" | "userId" | "currentPage" | "startDate" | "endDate"
>;

async function insert(userId: number, readingData: CreateReadingData) {
  await prisma.reading.create({ data: { userId, ...readingData } });
}

async function findUnfinishedByTitle(title: string) {
  const readings = await prisma.reading.findMany({
    where: {
      title,
      endDate: { equals: null },
    },
  });

  return readings[0];
}

export default { insert, findUnfinishedByTitle };
