import supertest from "supertest";
import bcrypt from "bcrypt";

import userBodyFactory from "../factories/userBodyFactory";
import prisma from "../../src/database";
import app from "../../src/app";
import readingBodyFactory from "../factories/readingBodyFactory";
import userService from "../../src/services/userService";
import authService from "../../src/services/authService";

describe("Test user and auth related routes", () => {
  beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users CASCADE;`;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe("POST /users", () => {
    it("should return status 201 and create a user", async () => {
      const user = userBodyFactory();
      const { status } = await supertest(app).post("/users").send(user);

      const inserted = await prisma.user.findUnique({
        where: { email: user.email },
      });

      expect(status).toBe(201);
      expect(inserted.name).toBe(user.name);
    });
  });

  describe("POST /auth/sign-in", () => {
    it("should return status 200, a token and the user name", async () => {
      const user = userBodyFactory();
      await userService.create(user);

      const { email, password } = user;
      const { status, body } = await supertest(app)
        .post("/auth/sign-in")
        .send({ email, password });

      expect(status).toBe(200);
      expect(body.token).toBeDefined();
      expect(body.name).toBe(user.name);
    });
  });
});

describe("Test reading related routes", () => {
  let token: string;
  let userId: number;

  beforeAll(async () => {
    const user = userBodyFactory();
    await userService.create(user);
    const { email, password } = user;
    token = (await authService.signIn({ email, password })).token;
    userId = authService.validateToken(token);
  });

  beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE readings CASCADE;`;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe("POST /readings", () => {
    it("should return status 201 and create a reading", async () => {
      const reading = readingBodyFactory();
      const { status } = await supertest(app)
        .post("/readings")
        .set("Authorization", `Bearer ${token}`)
        .send(reading);

      const inserted = await prisma.reading.findFirst({
        where: { title: reading.title },
      });
      expect(status).toBe(201);
      expect(inserted).toBeDefined();
    });

    it("should return status 201 and create reading with same title of a finished one", async () => {
      const finished = readingBodyFactory();
      await prisma.reading.create({
        data: { userId, ...finished, endDate: new Date() },
      });

      const reading = readingBodyFactory();
      reading.title = finished.title;
      const { status } = await supertest(app)
        .post("/readings")
        .set("Authorization", `Bearer ${token}`)
        .send(reading);

      const inserted = await prisma.reading.findFirst({
        where: { title: reading.title, endDate: null },
      });
      expect(status).toBe(201);
      expect(inserted).toBeDefined();
    });

    it("should return status 409 for a reading with same title of an unfinished one", async () => {
      const unfinished = readingBodyFactory();
      await prisma.reading.create({
        data: { userId, ...unfinished },
      });

      const reading = readingBodyFactory();
      reading.title = unfinished.title;
      const { status } = await supertest(app)
        .post("/readings")
        .set("Authorization", `Bearer ${token}`)
        .send(reading);

      const readings = await prisma.reading.findMany({
        where: { title: reading.title },
      });
      expect(status).toBe(409);
      expect(readings.length).toBe(1);
    });
  });

  describe("GET /readings", () => {
    it("should return status 200 and the readings of the user", async () => {
      const r1 = readingBodyFactory();
      const r2 = readingBodyFactory();
      await prisma.reading.create({ data: { userId, ...r1 } });
      await prisma.reading.create({ data: { userId, ...r2 } });

      const { status, body } = await supertest(app)
        .get("/readings")
        .set("Authorization", `Bearer ${token}`);

      expect(status).toBe(200);
      expect(body.length).toBe(2);
    });
  });

  describe("PATCH /readings/:id/finish", () => {
    it("should return status 200 and add an end date in a reading", async () => {
      const reading = readingBodyFactory();
      const { id, title } = await prisma.reading.create({
        data: { userId, ...reading },
      });

      const { status } = await supertest(app)
        .patch(`/readings/${id}/finish`)
        .set("Authorization", `Bearer ${token}`);

      const updated = await prisma.reading.findFirst({ where: { title } });
      expect(status).toBe(200);
      expect(updated.endDate).toBeTruthy();
    });
  });
});
