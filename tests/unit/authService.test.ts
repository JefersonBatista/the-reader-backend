import { jest } from "@jest/globals";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import signInBodyFactory from "../factories/signInBodyFactory";
import authService from "../../src/services/authService";
import userRepository from "../../src/repositories/userRepository";

describe("Test authentication service", () => {
  describe("Sign in", () => {
    it("should throw not found error for an email not signed-up", async () => {
      const signIn = signInBodyFactory();

      jest.spyOn(userRepository, "findByEmail").mockResolvedValueOnce(null);

      try {
        await authService.signIn(signIn);
      } catch (error) {
        expect(error.type).toBe("not_found");
      }
    });

    it("should throw unauthorized error for an incorrect password", async () => {
      const signIn = signInBodyFactory();

      jest.spyOn(userRepository, "findByEmail").mockResolvedValueOnce({
        id: 90,
        name: "MD",
        email: signIn.email,
        password: "123",
      });

      jest.spyOn(bcrypt, "compareSync").mockReturnValue(false);

      try {
        await authService.signIn(signIn);
      } catch (error) {
        expect(error.type).toBe("unauthorized");
      }
    });
  });

  describe("Validate token", () => {
    it("should throw an unauthorized error if JWT verification fails", () => {
      jest.spyOn(jwt, "verify").mockImplementation((token, secret) => {
        throw new Error("Some JWT error");
      });

      let userId: number;
      try {
        userId = authService.validateToken("fake_token");
      } catch (error) {
        expect(error.type).toBe("unauthorized");
      }
      expect(userId).toBeFalsy();
    });
  });
});
