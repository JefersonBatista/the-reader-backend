import { Reading } from "@prisma/client";
import prisma from "../database.js";

export type CreateReadingData = Omit<
  Reading,
  "id" | "userId" | "currentPage" | "startDate" | "endDate"
>;

async function insert(userId: number, readingData: CreateReadingData) {
  await prisma.reading.create({ data: { userId, ...readingData } });
}

async function findUnfinishedByTitle(userId: number, title: string) {
  const reading = await prisma.reading.findFirst({
    where: { userId, title, endDate: { equals: null } },
  });

  return reading;
}

async function findByUserId(userId: number) {
  const readings = await prisma.reading.findMany({
    where: { userId },
    orderBy: { id: "desc" },
  });

  return readings;
}

async function finishById(id: number) {
  await prisma.reading.update({ where: { id }, data: { endDate: new Date() } });
}

async function findById(id: number) {
  const reading = await prisma.reading.findUnique({ where: { id } });
  return reading;
}

async function bookmarkById(id: number, currentPage: number) {
  await prisma.reading.update({ where: { id }, data: { currentPage } });
}

export default {
  insert,
  findUnfinishedByTitle,
  findByUserId,
  finishById,
  findById,
  bookmarkById,
};
