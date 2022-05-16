import supertest from "supertest";
import bcrypt from "bcrypt";

import userBodyFactory from "../factories/userBodyFactory";
import prisma from "../../src/database";
import app from "../../src/app";

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
      const { email, password } = user;

      const hashedPassword = bcrypt.hashSync(password, 10);
      await prisma.user.create({ data: { ...user, password: hashedPassword } });

      const { status, body } = await supertest(app)
        .post("/auth/sign-in")
        .send({ email, password });

      expect(status).toBe(200);
      expect(body.token).toBeDefined();
      expect(body.name).toBe(user.name);
    });
  });
});
