import { jest } from "@jest/globals";

import userBodyFactory from "../factories/userBodyFactory";
import userRepository from "../../src/repositories/userRepository";
import userService from "../../src/services/userService";

describe("Test user service", () => {
  describe("User creation", () => {
    it("should throw conflict error for duplicated user", async () => {
      const user = userBodyFactory();

      jest
        .spyOn(userRepository, "findByEmail")
        .mockResolvedValue({ id: 14, ...user });

      const insert = jest
        .spyOn(userRepository, "insert")
        .mockResolvedValue(null);

      try {
        await userService.create(user);
      } catch (error) {
        expect(error.type).toBe("conflict");
      }

      expect(insert).toBeCalledTimes(0);
    });
  });
});
