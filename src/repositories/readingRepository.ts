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
    where: { title, endDate: { equals: null } },
  });

  return readings[0];
}

async function findByUserId(userId: number) {
  const readings = await prisma.reading.findMany({ where: { userId } });

  return readings;
}

async function finishById(id: number) {
  await prisma.reading.update({ where: { id }, data: { endDate: new Date() } });
}

async function findById(id: number) {
  const reading = await prisma.reading.findUnique({ where: { id } });
  return reading;
}

export default {
  insert,
  findUnfinishedByTitle,
  findByUserId,
  finishById,
  findById,
};
